// app/category/make-money/page.js - FIXED

import Footer from "@/app/Footer";
import Nav1 from "@/app/components/Nav1";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import '../side-hustle/category-styles.css';

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
      ? `https://www.trendzlib.com.ng/category/make-money`
      : `https://www.trendzlib.com.ng/category/make-money?page=${currentPage}`;

  return {
    title: `Make Money Online in Nigeria - Trendzlib ${currentPage > 1 ? `(Page ${currentPage})` : ''}`,
    description: `Learn how to make money online in Nigeria through freelancing, remote jobs, digital products and proven strategies.`,
    alternates: { canonical: canonicalUrl },
  };
}

export default async function MakeMoneyCategory({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || "1");
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const query = encodeURIComponent(
    `*[_type=="news" && category=="make-money"] | order(publishedAt desc)[${start}...${end}]{
      _id, title, image, category, content, author, publishedAt
    }`
  );
  
  const countQuery = encodeURIComponent(
    `count(*[_type=="news" && category=="make-money"])`
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
          <h3>No posts yet in Make Money Online</h3>
          <p>Check back soon for guides on freelancing, remote work, and online income!</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!posts.length && currentPage > 1) return notFound();

  return (
    <div style={{ background: "#1a1a2e", minHeight: "100vh" }} className="category-make-money">
      <Nav1 />
      
      <div className="container pt-5 pb-5">
        <div className="text-center mb-5">
          <div className="mb-3" style={{ fontSize: "3rem" }}>💰</div>
          <h1 className="text-light display-4 fw-bold mb-3">Make Money Online</h1>
          <p className="text-light fs-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Freelancing guides, remote work opportunities, and proven strategies to earn online from Nigeria
          </p>
        </div>

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
                      <span className="finance-badge badge-success">Make Money</span>
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
                        <span className="text-success" style={{ fontSize: "0.9rem", fontWeight: "600" }}>
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

        {totalPages > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-5">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/category/make-money?page=${i + 1}`}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}