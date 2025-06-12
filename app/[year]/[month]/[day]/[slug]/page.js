import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/app/Footer';
import styles from './detail.module.css';
import Link from 'next/link';
import Nav1 from '@/app/components/Nav1';
import Script from 'next/script';
import Head from 'next/head';

const slugify = (text) =>
  text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

const fetchPosts = async () => {
  const query = encodeURIComponent(`{
    "sportsPost": *[_type == "sportsPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "educationPost": *[_type == "educationPost"] | order(date desc) {...},
    "politicsPost": *[_type == "politicsPost"] | order(date desc) {...},
    "technologyPost": *[_type == "technologyPost"] | order(date desc) {...},
    "healthPost": *[_type == "healthPost"] | order(date desc) {...},
    "celebrityPost": *[_type == "celebrityPost"] | order(date desc) {...},
    "mainPost": *[_type == "mainPost"] | order(date desc) {...}
  }`);
  const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`;

  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_AUTH
    },
    next: { revalidate: 60 } // cache for 1 min
  });
  const data = await res.json();
  return [
    ...(data.result?.mainPost || []),
    ...(data.result?.sportsPost || []),
    ...(data.result?.educationPost || []),
    ...(data.result?.politicsPost || []),
    ...(data.result?.technologyPost || []),
    ...(data.result?.healthPost || []),
    ...(data.result?.celebrityPost || [])
  ];
};

export async function generateMetadata({ params }) {
  const allPosts = await fetchPosts();
  const post = allPosts.find((p) => slugify(p.title) === params.slug);

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.description?.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.description?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
      type: 'article',
      url: `https://naijagossip.vercel.app/${params.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg']
    }
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

function generateSlug(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
}

export default async function DetailPage({ params }) {
  const allPosts = await fetchPosts();
  const post = allPosts.find((p) => slugify(p.title) === params.slug);

  if (!post) return notFound();

  const relatedPosts = allPosts
    .filter((p) => slugify(p.title) !== params.slug && p.category === post.category)
    .slice(0, 6);

  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const postUrl = `/${year}/${month}/${day}/${generateSlug(post.title)}`;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || "Latest gist from NaijaGossip"} />
        <meta property="og:image" content={post.image || "/default-thumbnail.jpg"} />
        <meta property="og:url" content={`https://naijagossip.vercel.app/${params.slug}`} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || "Latest gist from NaijaGossip"} />
        <meta name="twitter:image" content={post.image || "/default-thumbnail.jpg"} />
      </Head>

      <Nav1 />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span><i className="fa fa-user"></i> {post.author || 'Anonymous'}</span>
          <span><i className="fa fa-calendar"></i> {formatDate(post.date)}</span>
        </div>
        <Image src={post.image} alt={post.title} width={800} height={450} className={styles.hero} />
        <p className={styles.content}>{post.description}</p>
        <p className={styles.author}>Written by {post.author || 'Anonymous'}</p>
        <div className={styles.share}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://naijagossip.vercel.app${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=https://naijagossip.vercel.app${postUrl}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter"></i>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' https://naijagossip.vercel.app' + postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
        </div>


        <h4>Related Posts</h4>
        <div className="row">
          {relatedPosts.map((related) => {
            const date = new Date(related.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const relatedSlug = `/${year}/${month}/${day}/${generateSlug(related.title)}`;

            return (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={related._id}>
                <div
                  className="my-related-card p-2"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="my-related-thumb position-relative">
                    <Image
                      src={related.image || '/assets/img/placeholder.png'}
                      alt={related.title}
                      width={400}
                      height={200}
                      className="card-img-top"
                    />
                    <a className={`my-related-tag ${related.categoryClass || 'bg-secondary'}`} href="#">
                      {related.category}
                    </a>
                  </div>
                  <div className="my-related-details mt-2">
                    <h6 className="my-related-title">
                      <Link href={relatedSlug} className="text-dark">{related.title}</Link>
                    </h6>
                    <div className="my-related-meta">
                      <ul className="list-unstyled mb-0">
                        <li><i className="fa fa-clock-o me-1"></i>{formatDate(related.date)}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Script src="/assets/js/vendor.js" />
      </div>
      <Footer />
    </>
  );
}
