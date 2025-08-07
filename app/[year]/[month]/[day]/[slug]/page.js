import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/app/Footer';
import styles from './detail.module.css';
import Link from 'next/link';
import Nav1 from '@/app/components/Nav1';
import Script from 'next/script';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
function slugify(text) {
  // Convert to lowercase and trim leading/trailing whitespace
  let slug = text.toLowerCase().trim();

  // Replace accented characters with their non-accented equivalents
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces, underscores, and other non-alphanumeric characters (except hyphens) with a single hyphen
  slug = slug.replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

const fetchAllPosts = async () => {
  const query = encodeURIComponent(`{
    "posts": *[
      _type in ["mainPost", "sportsPost", "educationPost", "politicsPost", "technologyPost", "healthPost", "celebrityPost"]
    ] {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    }
  }`);

  const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`;

  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_AUTH,
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data.result?.posts || [];
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

function generateSlug(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
}

export async function generateMetadata({ params }) {
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === params.slug);

  if (!post) return notFound();

  const postUrl = `https://trendzlib.com.ng/${params.year}/${params.month}/${params.day}/${generateSlug(post.title)}`;

  return {
    title: post.title,
    description: post.description?.slice(0, 150),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
      type: 'article',
      url: postUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
    },
  };
}


export default async function DetailPage({ params }) {
  const { slug, year, month, day } = params;
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === slug);

  if (!post) return notFound();

  const relatedPosts = allPosts
    .filter((p) => slugify(p.title) !== slug && p.category === post.category)
    .slice(0, 6);

  const postUrl = `/${year}/${month}/${day}/${generateSlug(post.title)}`;

  return (
    <>


      <Nav1 />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span><i className="fa fa-user"></i> {post.author || 'Anonymous'}</span>
          <span><i className="fa fa-calendar"></i> {formatDate(post.date)}</span>
        </div>
        <Image src={post.image} alt={post.title} width={800} height={450} className={styles.hero} loading="lazy" />
        <div className={styles.description}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}>
            {post.description}
          </ReactMarkdown>
        </div>

        <p className={styles.author}>Written by {post.author || 'Anonymous'}</p>

        <div className={styles.share}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://trendzlib.com.ng${postUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=https://trendzlib.com.ng${postUrl}&text=${encodeURIComponent(post.title)}`
}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + 'https://trendzlib.com.ng' + postUrl)}`}
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
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const relatedSlug = `/${y}/${m}/${d}/${generateSlug(related.title)}`;

            return (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={related._id}>
                <div className="my-related-card p-2" style={{ cursor: 'pointer' }}>
                  <div className="my-related-thumb position-relative">
                    <Image
                      src={related.image || '/assets/img/placeholder.png'}
                      alt={related.title}
                      width={400}
                      height={200}
                      className="card-img-top"
                      loading="lazy"
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
