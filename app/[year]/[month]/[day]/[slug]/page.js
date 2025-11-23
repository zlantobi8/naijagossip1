// app/[year]/[month]/[day]/[slug]/page.js - WITH PROPER NEWS ARTICLE SCHEMA

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

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

// Generate NewsArticle structured data
function generateArticleSchema(post, postUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.content?.slice(0, 150),
    "image": post.image || "https://www.trendzlib.com.ng/assets/img/placeholder.png",
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "Trendzlib Editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trendzlib",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.trendzlib.com.ng/assets/img/naija2.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category,
    "inLanguage": "en-NG"
  };
}

export async function generateMetadata({ params }) {
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === params.slug);

  if (!post) return notFound();

  const postUrl = `https://www.trendzlib.com.ng/${params.year}/${params.month}/${params.day}/${params.slug}`;

  return {
    title: `${post.title} | Trendzlib`,
    description: post.content?.slice(0, 160),
    alternates: { canonical: postUrl },
    keywords: `${post.title}, ${post.category}, Nigerian news, Trendzlib`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
      type: 'article',
      url: postUrl,
      siteName: 'Trendzlib',
      locale: 'en_NG',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author || 'Trendzlib Editorial'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.image || '/default-thumbnail.jpg'],
      site: '@trendzlib',
      creator: '@trendzlib',
    },
  };
}

function injectSmartLinks(content, relatedPosts) {
  if (!relatedPosts.length) return content;

  let enhanced = content;

  relatedPosts.forEach((rel) => {
    const date = new Date(rel.publishedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const postUrl = `/${year}/${month}/${day}/${slugify(rel.title)}`;

    const keyword = rel.title.split(" ")[0];
    const regex = new RegExp(`\\b${keyword}\\b`, "i");

    if (regex.test(enhanced)) {
      enhanced = enhanced.replace(
        regex,
        `${keyword} (👉 [Read also: ${rel.title}](${postUrl}))`
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
  
  const postUrl = `https://www.trendzlib.com.ng/${params.year}/${params.month}/${params.day}/${params.slug}`;
  const articleSchema = generateArticleSchema(post, postUrl);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Nav1 />

      <article className={styles.wrapper}>
        <header>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span><i className="fa fa-user"></i> {post.author || 'Trendzlib Editorial'}</span>
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              <i className="fa fa-calendar"></i> {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        <Image
          src={post.image || '/assets/img/placeholder.png'}
          alt={post.title}
          width={800}
          height={450}
          className={styles.hero}
          priority
        />

        <div className={styles.description}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {enhancedContent}
          </ReactMarkdown>
        </div>

        <p className={styles.author}>Written by {post.author || 'Trendzlib Editorial'}</p>

        <div className={styles.share} aria-label="Share article">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            aria-label="Share on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(post.title)}`}
            aria-label="Share on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + postUrl)}`}
            aria-label="Share on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
        </div>

        <section aria-labelledby="related-posts-heading">
          <h4 id="related-posts-heading">Related Posts</h4>
          <div className="row">
            {relatedPosts.map((related) => {
              const date = new Date(related.publishedAt);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const postUrl11 = `/${year}/${month}/${day}/${slugify(related.title)}`;
              
              return (
                <div className="col-lg-4 col-md-6 col-12 mb-4" key={related._id}>
                  <article className="my-related-card p-2" style={{ cursor: 'pointer' }}>
                    <div className="my-related-thumb position-relative">
                      <Image
                        src={related.image || '/assets/img/placeholder.png'}
                        alt={related.title}
                        width={400}
                        height={200}
                        className="card-img-top"
                        loading="lazy"
                      />
                      <Link
                        href={postUrl11}
                        className={`my-related-tag ${related.category || 'bg-secondary'}`}
                      >
                        {related.category}
                      </Link>
                    </div>
                    <div className="my-related-details mt-2">
                      <h6 className="my-related-title">
                        <Link href={postUrl11} className="text-dark">
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
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <Script src="/assets/js/vendor.js" />
      </article>

      <Footer />
    </>
  );
}