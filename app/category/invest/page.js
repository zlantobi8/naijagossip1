// app/category/invest/page.js

import Footer from "@/app/Footer";
import Nav1 from "@/app/components/Nav1";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const pageSize = 12;

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

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || "1");
  const canonicalUrl =
    currentPage === 1
      ? `https://www.trendzlib.com.ng/category/invest`
      : `https://www.trendzlib.com.ng/category/invest?page=${currentPage}`;

  return {
    title: `Smart Investment Guides for Nigerians - Trendzlib (Page ${currentPage > 1 ? currentPage : ''})`,
    description: `Learn about cryptocurrency, stocks, savings apps, and investment strategies for Nigerians. Page ${currentPage}.`,
    alternates: { canonical: canonicalUrl },
  };
}

export default async function InvestCategory({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || "1");
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const query = encodeURIComponent(
    `*[_type=="news" && category=="invest"] | order(publishedAt desc)[${start}...${end}]{
      _id, title, image, category, content, author, publishedAt
    }`
  );
  
  const countQuery = encodeURIComponent(
    `count(*[_type=="news" && category=="invest"])`
  );

  const [postsRes, countRes] = await Promise.all([
    fetch(
      `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`,
      { next: { revalidate: 30 } }
    ),
    fetch(
      `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${countQuery}`,
      { next: { revalidate: 30 } }
    ),
  ]);

  const postsData = await postsRes.json();
  const countData = await countRes.json();

  const posts = postsData.result || [];
  const totalPosts = countData.result || 0;
  const totalPages = Math.ceil(totalPosts / pageSize);

  if (!posts.length && currentPage === 1) {
    return (
      <div style={{ background: "#1a1a2e", minHeight: "100vh" }}>
        <Nav1 />
        <div className="container pt-5 text-center text-light">
          <h3>No posts yet in Invest Smart</h3>
          <p>Check back soon for guides on crypto, stocks, and smart investing!</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!posts.length && currentPage > 1) return notFound();

  return (
    <div style={{ background: "#1a1a2e", minHeight: "100vh" }}>
      <Nav1 />
      
      <div className="container pt-5 pb-5">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="mb-3" style={{ fontSize: "3rem" }}>📈</div>
          <h1 className="text-light display-4 fw-bold mb-3">Invest Smart</h1>
          <p className="text-light fs-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Cryptocurrency guides, stock investing, savings apps, and wealth-building strategies for Nigerians
          </p>
        </div>

        {/* Posts Grid */}
        <div className="row g-4">
          {posts.map((post) => {
            const date = new Date(post.publishedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const postUrl = `/${year}/${month}/${day}/${generateSlug(post.title)}`;

            return (
              <div key={post._id} className="col-lg-4 col-md-6">
                <Link href={postUrl} className="text-decoration-none">
                  <div className="finance-card h-100">
                    <div className="finance-card-image">
                      <Image
                        src={post.image || "/assets/img/placeholder.png"}
                        alt={post.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        className="img-fluid"
                      />
                      <span className="finance-badge badge-primary">Invest</span>
                    </div>
                    <div className="finance-card-content p-4">
                      <h5 className="text-white mb-3">{post.title}</h5>
                      <p className="text-muted mb-3" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                        {post.content?.slice(0, 120)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                          <i className="fa fa-clock-o me-1"></i>
                          {`${day}-${month}-${year}`}
                        </span>
                        <span className="text-primary" style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                          Read Guide →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-5">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/category/invest?page=${i + 1}`}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />

      <style jsx>{`
        .finance-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .finance-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .finance-card-image {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .finance-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .finance-card:hover .finance-card-image img {
          transform: scale(1.1);
        }

        .finance-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-primary {
          background: #3b82f6;
          color: white;
        }

        .page-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .page-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .page-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
      `}</style>
    </div>
  );
}