// app/[year]/[month]/[day]/[slug]/page.js - FINAL VERSION WITH ALL SEO

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

function generateBreadcrumbSchema(post, { year, month, day, slug }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.trendzlib.com.ng"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": post.category.charAt(0).toUpperCase() + post.category.slice(1),
        "item": `https://www.trendzlib.com.ng/category/${post.category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.trendzlib.com.ng/${year}/${month}/${day}/${slug}`
      }
    ]
  };
}


// Article Schema
function generateArticleSchema(post, postUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.content?.slice(0, 160),
    "image": [post.image || "https://www.trendzlib.com.ng/assets/img/placeholder.png"],
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Trendzlib",
      "url": "https://www.trendzlib.com.ng"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trendzlib",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.trendzlib.com.ng/assets/img/naija2.png",
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category,
    "inLanguage": "en-NG",
    "keywords": `${post.title}, ${post.category}, Nigerian news, Trendzlib`
  };
}

export async function generateMetadata({ params }) {
  const { year, month, day, slug } = await params; // ✅ unwrap

  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === slug);

  if (!post) return notFound();

  const postUrl = `https://www.trendzlib.com.ng/${year}/${month}/${day}/${slug}`;

  const titleWords = post.title.split(' ').slice(0, 10).join(', ');

  return {
    title: `${post.title} - Latest News | Trendzlib`,
    description:
      post.content?.slice(0, 160) ||
      `Read the latest about ${post.title} on Trendzlib.`,
    alternates: { canonical: postUrl },
    keywords: `${titleWords}, ${post.category} news, Nigerian ${post.category}`,
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [{ url: post.image }],
      type: 'article',
      url: postUrl,
      siteName: 'Trendzlib',
      locale: 'en_NG',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.slice(0, 150),
      images: [post.image],
    },
  };
}


// Generate static paths for better indexing
export async function generateStaticParams() {
  const allPosts = await fetchAllPosts();
  
  return allPosts.slice(0, 100).map((post) => {
    const date = new Date(post.publishedAt);
    return {
      year: String(date.getFullYear()),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      day: String(date.getDate()).padStart(2, '0'),
      slug: slugify(post.title),
    };
  });
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
  // 1️⃣ Unwrap params ONCE
  const resolvedParams = await params;
  const { year, month, day, slug } = resolvedParams;

  // 2️⃣ Fetch posts
  const allPosts = await fetchAllPosts();
  const post = allPosts.find((p) => slugify(p.title) === slug);

  if (!post) return notFound();

  // 3️⃣ Related posts
  const relatedPosts = allPosts
    .filter((p) => slugify(p.title) !== slug && p.category === post.category)
    .slice(0, 6);

  // 4️⃣ DEFINE enhancedContent (🔥 THIS WAS MISSING)
  const enhancedContent = injectSmartLinks(
    post.content || '',
    relatedPosts
  );

  // 5️⃣ URLs + schemas
  const postUrl = `https://www.trendzlib.com.ng/${year}/${month}/${day}/${slug}`;
  const articleSchema = generateArticleSchema(post, postUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(post, {
    year,
    month,
    day,
    slug,
  });

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="beforeInteractive"
      />
      
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />

      <Nav1 />

      <article className={styles.wrapper} itemScope itemType="https://schema.org/NewsArticle">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ padding: '1rem 0', fontSize: '0.9rem', color: '#666' }}>
          <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: '0.5rem', flexWrap: 'wrap' }}>
            <li>
              <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/category/${post.category}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Link>
            </li>
            <li>/</li>
            <li style={{ color: '#333' }}>{post.title.slice(0, 50)}...</li>
          </ol>
        </nav>

        <header>
          <h1 className={styles.title} itemProp="headline">{post.title}</h1>
          <div className={styles.meta}>
            <span itemProp="author" itemScope itemType="https://schema.org/Organization">
              <i className="fa fa-user"></i> 
              <span itemProp="name">{post.author || 'Trendzlib Editorial'}</span>
            </span>
            <time dateTime={new Date(post.publishedAt).toISOString()} itemProp="datePublished">
              <i className="fa fa-calendar"></i> {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        <figure>
          <Image
            src={post.image || '/assets/img/placeholder.png'}
            alt={post.title}
            width={800}
            height={450}
            className={styles.hero}
            priority
            itemProp="image"
          />
        </figure>

        <div className={styles.description} itemProp="articleBody">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {enhancedContent}
          </ReactMarkdown>
        </div>

        {/* Internal Links Section */}
        <aside style={{
          background: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          margin: '2rem 0',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>
            📰 More {post.category.charAt(0).toUpperCase() + post.category.slice(1)} News
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {relatedPosts.slice(0, 5).map((related) => {
              const date = new Date(related.publishedAt);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const relatedUrl = `/${year}/${month}/${day}/${slugify(related.title)}`;
              
              return (
                <li key={related._id} style={{ marginBottom: '0.8rem' }}>
                  <Link 
                    href={relatedUrl}
                    style={{ 
                      color: '#0070f3', 
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    <span>→</span>
                    <span>{related.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <p className={styles.author}>
          Written by <span itemProp="author">{post.author || 'Trendzlib Editorial'}</span>
        </p>

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
          <h2 id="related-posts-heading" style={{ fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1.5rem' }}>
            Related Articles
          </h2>
          <div className="row">
            {relatedPosts.map((related) => {
              const date = new Date(related.publishedAt);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const postUrl11 = `/${year}/${month}/${day}/${slugify(related.title)}`;
              
              return (
                <div className="col-lg-4 col-md-6 col-12 mb-4" key={related._id}>
                  <article className="my-related-card p-2" style={{ cursor: 'pointer', height: '100%' }}>
                    <div className="my-related-thumb position-relative">
                      <Image
                        src={related.image || '/assets/img/placeholder.png'}
                        alt={related.title}
                        width={400}
                        height={200}
                        className="card-img-top"
                        loading="lazy"
                        style={{ borderRadius: '8px 8px 0 0' }}
                      />
                      <Link
                        href={postUrl11}
                        className={`my-related-tag ${related.category || 'bg-secondary'}`}
                      >
                        {related.category}
                      </Link>
                    </div>
                    <div className="my-related-details mt-2">
                      <h3 className="my-related-title" style={{ fontSize: '1rem' }}>
                        <Link href={postUrl11} className="text-dark">
                          {related.title}
                        </Link>
                      </h3>
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