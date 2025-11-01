// app/page.js - FINANCE HOMEPAGE (FIXED - No styled-jsx)

import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';
import Navbar2 from './components/Navbar2';
import './finance-styles.css'; // We'll create this

const siteTitle = 'Trendzlib - Smart Money Moves for Nigerians';
const siteDescription = 'Learn how Nigerians are making ₦200k-₦500k monthly through freelancing, crypto investing, and smart side hustles. Free guides & proven strategies.';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: 'make money online Nigeria, freelancing Nigeria, cryptocurrency Nigeria, side hustles Nigeria, investment apps Nigeria, remote jobs Nigeria, Binance Nigeria, passive income Nigeria',
  alternates: { canonical: 'https://www.trendzlib.com.ng' },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.trendzlib.com.ng',
    siteName: 'Trendzlib',
    images: [{ url: 'https://www.trendzlib.com.ng/assets/img/naija.png', width: 200, height: 60, alt: 'Trendzlib - Financial Freedom for Nigerians' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    site: '@trendzlib',
    images: ['https://www.trendzlib.com.ng/assets/img/naija.png'],
  },
};

// Fetch finance content from Sanity
async function fetchData() {
  const query = encodeURIComponent(`{
    "makeMoneyPosts": *[_type == "news" && category == "make-money"] | order(publishedAt desc)[0...8] {
      _id, title, content, category, categoryClass, image, source, link, publishedAt, author
    },
    "investPosts": *[_type == "news" && category == "invest"] | order(publishedAt desc)[0...8] {
      _id, title, content, category, categoryClass, image, source, link, publishedAt, author
    },
    "hustlePosts": *[_type == "news" && category == "side-hustle"] | order(publishedAt desc)[0...8] {
      _id, title, content, category, categoryClass, image, source, link, publishedAt, author
    }
  }`);

  const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { makeMoneyPosts: [], investPosts: [], hustlePosts: [] };
    }

    const data = await res.json();
    return data.result || { makeMoneyPosts: [], investPosts: [], hustlePosts: [] };
  } catch (error) {
    return { makeMoneyPosts: [], investPosts: [], hustlePosts: [] };
  }
}

function generateSlug(text) {
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

export default async function Home() {
  const categorizedPosts = await fetchData();

  const makeMoneyPosts = categorizedPosts.makeMoneyPosts || [];
  const investPosts = categorizedPosts.investPosts || [];
  const hustlePosts = categorizedPosts.hustlePosts || [];

  return (
    <>
      {/* Hero Section */}
      <div className="finance-hero">
        <Navbar2 />
        
        <div className="container py-5">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-8 mx-auto text-center">
              {/* Badge */}
              <div className="hero-badge mb-4">
                <span>🔥 Join 5,000+ Nigerians Building Wealth</span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-title mb-4">
                Smart Money Moves<br />
                <span className="text-gradient">for Nigerians</span>
              </h1>

              {/* Subheadline */}
              <p className="hero-subtitle mb-5">
                Learn how everyday Nigerians are making <strong className="text-success">₦200k-₦500k monthly</strong> through freelancing, investing, and smart side hustles
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Link href="#guides" className="btn btn-success btn-lg px-5 py-3 rounded-pill">
                  📚 Start Learning Free
                </Link>
                <Link href="#categories" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  Explore Categories
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges d-flex flex-wrap justify-content-center gap-4 mt-4">
                <span>✓ 100% Free</span>
                <span>✓ Proven Strategies</span>
                <span>✓ Real Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-5 bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-white mb-3">Your Money Growth Path</h2>
            <p className="text-light fs-5">Choose your focus area and start learning today</p>
          </div>

          <div className="row g-4">
            {/* Make Money Online */}
            <div className="col-lg-4">
              <div className="category-card h-100 p-4 rounded-4">
                <div className="category-icon mb-4">💰</div>
                <h3 className="text-white mb-3">Make Money Online</h3>
                <p className="text-light mb-4">Freelancing, remote jobs, digital products, and online opportunities</p>
                <Link href="#make-money" className="btn btn-success w-100">
                  View Guides →
                </Link>
              </div>
            </div>

            {/* Invest Smart */}
            <div className="col-lg-4">
              <div className="category-card h-100 p-4 rounded-4">
                <div className="category-icon mb-4">📈</div>
                <h3 className="text-white mb-3">Invest Smart</h3>
                <p className="text-light mb-4">Cryptocurrency, stocks, savings apps, and investment strategies</p>
                <Link href="#invest" className="btn btn-primary w-100">
                  View Guides →
                </Link>
              </div>
            </div>

            {/* Side Hustles */}
            <div className="col-lg-4">
              <div className="category-card h-100 p-4 rounded-4">
                <div className="category-icon mb-4">💼</div>
                <h3 className="text-white mb-3">Side Hustles</h3>
                <p className="text-light mb-4">Business ideas, weekend gigs, and extra income streams</p>
                <Link href="#hustle" className="btn btn-warning w-100">
                  View Guides →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Make Money Online Section */}
      {makeMoneyPosts.length > 0 && (
        <section id="make-money" className="py-5 bg-black">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-white display-5 fw-bold mb-2">💰 Make Money Online</h2>
                <p className="text-light">Start earning from anywhere in Nigeria</p>
              </div>
              <Link href="/category/make-money" className="btn btn-outline-success d-none d-md-block">
                See All →
              </Link>
            </div>

            <div className="row g-4">
              {makeMoneyPosts.slice(0, 4).map((post) => {
                const date = new Date(post.publishedAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const slug = generateSlug(post.title);
                const postUrl = `/${year}/${month}/${day}/${slug}`;

                return (
                  <div key={post._id} className="col-lg-3 col-md-6">
                    <Link href={postUrl} className="text-decoration-none">
                      <div className="finance-post-card h-100">
                        <div className="post-image-wrapper">
                          <Image
                            src={post.image || '/assets/img/placeholder.png'}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="post-image"
                            loading="lazy"
                          />
                          <span className="post-badge badge-success">New</span>
                        </div>
                        <div className="post-content p-3">
                          <h5 className="text-white mb-3">{post.title}</h5>
                          <div className="post-meta">
                            <span className="text-muted">
                              <i className="fa fa-clock-o me-1"></i>
                              {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Invest Smart Section */}
      {investPosts.length > 0 && (
        <section id="invest" className="py-5 bg-dark">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-white display-5 fw-bold mb-2">📈 Invest Smart</h2>
                <p className="text-light">Grow your wealth with proven strategies</p>
              </div>
              <Link href="/category/invest" className="btn btn-outline-primary d-none d-md-block">
                See All →
              </Link>
            </div>

            <div className="row g-4">
              {investPosts.slice(0, 4).map((post) => {
                const date = new Date(post.publishedAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const slug = generateSlug(post.title);
                const postUrl = `/${year}/${month}/${day}/${slug}`;

                return (
                  <div key={post._id} className="col-lg-3 col-md-6">
                    <Link href={postUrl} className="text-decoration-none">
                      <div className="finance-post-card h-100">
                        <div className="post-image-wrapper">
                          <Image
                            src={post.image || '/assets/img/placeholder.png'}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="post-image"
                            loading="lazy"
                          />
                          <span className="post-badge badge-primary">Trending</span>
                        </div>
                        <div className="post-content p-3">
                          <h5 className="text-white mb-3">{post.title}</h5>
                          <div className="post-meta">
                            <span className="text-muted">
                              <i className="fa fa-clock-o me-1"></i>
                              {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Side Hustles Section */}
      {hustlePosts.length > 0 && (
        <section id="hustle" className="py-5 bg-black">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-white display-5 fw-bold mb-2">💼 Side Hustles</h2>
                <p className="text-light">Extra income ideas for busy Nigerians</p>
              </div>
              <Link href="/category/side-hustle" className="btn btn-outline-warning d-none d-md-block">
                See All →
              </Link>
            </div>

            <div className="row g-4">
              {hustlePosts.slice(0, 4).map((post) => {
                const date = new Date(post.publishedAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const slug = generateSlug(post.title);
                const postUrl = `/${year}/${month}/${day}/${slug}`;

                return (
                  <div key={post._id} className="col-lg-3 col-md-6">
                    <Link href={postUrl} className="text-decoration-none">
                      <div className="finance-post-card h-100">
                        <div className="post-image-wrapper">
                          <Image
                            src={post.image || '/assets/img/placeholder.png'}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="post-image"
                            loading="lazy"
                          />
                          <span className="post-badge badge-warning">Popular</span>
                        </div>
                        <div className="post-content p-3">
                          <h5 className="text-white mb-3">{post.title}</h5>
                          <div className="post-meta">
                            <span className="text-muted">
                              <i className="fa fa-clock-o me-1"></i>
                              {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="cta-box text-center p-5 rounded-4">
            <h2 className="text-white display-4 fw-bold mb-4">
              Ready to Start Your Money Journey?
            </h2>
            <p className="text-light fs-5 mb-4">
              Join thousands of Nigerians transforming their finances
            </p>
            <Link href="#guides" className="btn btn-success btn-lg px-5 py-3 rounded-pill">
              📚 Explore All Guides
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}