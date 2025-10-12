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

// ✅ Slugify function (consistent with newsUpdater)
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ✅ Fetch all news posts from Sanity
const fetchAllPosts = async () => {
  const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc) {
    _id, title, "image": image, category, content, source, link, publishedAt, author
  }`);

  const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;

  const res = await fetch(url, {

    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data.result || [];
};

// ✅ Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

// ✅ Generate metadata
export async function generateMetadata({ params }) {
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === params.slug);

  if (!post) return notFound();

  const postUrl = `https://www.trendzlib.com.ng/${params.slug}`;

  return {
    title: post.title,
    description: post.content?.slice(0, 150),
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
      type: 'article',
      url: postUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
    },
  };
}

// ✅ Inject related posts links
function injectSmartLinks(content, relatedPosts) {
  if (!relatedPosts.length) return content;

  let enhanced = content;
  relatedPosts.forEach((rel) => {
    const keyword = rel.title.split(" ")[0];
    const regex = new RegExp(`\\b${keyword}\\b`, "i");
    if (regex.test(enhanced)) {
      enhanced = enhanced.replace(
        regex,
        `${keyword} (👉 [Read also: ${rel.title}](/${slugify(rel.title)}))`
      );
    }
  });
  return enhanced;
}

export default async function DetailPage({ params }) {
  const { slug } = params;
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === slug);

  if (!post) return notFound();

  const relatedPosts = allPosts
    .filter((p) => slugify(p.title) !== slug && p.category === post.category)
    .slice(0, 6);

  const enhancedContent = injectSmartLinks(post.content, relatedPosts);

  return (
    <>
      <Nav1 />

      <div className={styles.wrapper}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span><i className="fa fa-user"></i> {post.author || 'Trendzlib Editorial'}</span>
          <span><i className="fa fa-calendar"></i> {formatDate(post.publishedAt)}</span>
        </div>

        <Image
          src={post.image || '/assets/img/placeholder.png'}
          alt={post.title}
          width={800}
          height={450}
          className={styles.hero}
          loading="lazy"
          unoptimized
        />

        <div className={styles.description}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {enhancedContent}
          </ReactMarkdown>
        </div>

        <p className={styles.author}>Written by {post.author || 'Trendzlib Editorial'}</p>

        <div className={styles.share}>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.trendzlib.com.ng/${slug}`}><i className="fa fa-facebook"></i></a>
          <a href={`https://twitter.com/intent/tweet?url=https://www.trendzlib.com.ng/${slug}&text=${encodeURIComponent(post.title)}`}><i className="fa fa-twitter"></i></a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' https://www.trendzlib.com.ng/' + slug)}`}><i className="fa fa-whatsapp"></i></a>
        </div>

        <h4>Related Posts</h4>
        <div className="row">
          {relatedPosts.map((related) => {
            const date = new Date(related.publishedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const postUrl11 = `/${year}/${month}/${day}/${generateSlug(related.title)}`;
           (
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
                    unoptimized
                  />
                  <Link
                    href={`/${slugify(postUrl11)}`}
                    className={`my-related-tag ${related.category || 'bg-secondary'}`}
                  >
                    {related.category}
                  </Link>
                </div>
                <div className="my-related-details mt-2">
                  <h6 className="my-related-title">
                    <Link href={`/${slugify(postUrl11)}`} className="text-dark">
                      {related.title}
                    </Link>
                  </h6>
                  <div className="my-related-meta">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="fa fa-clock-o me-1"></i>
                        {formatDate(related.publishedAt)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
          }
        )}
        </div>


        <Script src="/assets/js/vendor.js" />
      </div>

      <Footer />
    </>
  );
}
