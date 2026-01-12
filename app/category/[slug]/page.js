import Footer from "@/app/Footer";
import Nav1 from "@/app/components/Nav1";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Allowed categories (must match Sanity exactly)
const allowedCategories = ["sport", "entertainment"];
const pageSize = 8;

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

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;                // ✅ REQUIRED
  const resolvedSearchParams = await searchParams; // ✅ REQUIRED

  if (!allowedCategories.includes(slug)) return notFound();

  const currentPage = parseInt(resolvedSearchParams?.page || "1", 10);

  const canonicalUrl =
    currentPage === 1
      ? `https://www.trendzlib.com.ng/category/${slug}`
      : `https://www.trendzlib.com.ng/category/${slug}?page=${currentPage}`;

  const categoryTitle =
    slug === "sport"
      ? "Sport"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `Latest ${categoryTitle} News - Trendzlib`,
    description: `Read the latest ${categoryTitle.toLowerCase()} news and updates on Trendzlib.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;                 // ✅ REQUIRED
  const resolvedSearchParams = await searchParams; // ✅ REQUIRED

  if (!allowedCategories.includes(slug)) return notFound();

  const currentPage = parseInt(resolvedSearchParams?.page || "1", 10);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  // Sanity queries
  const postsQuery = encodeURIComponent(`
    *[_type=="news" && category=="${slug}"]
    | order(publishedAt desc)
    [${start}...${end}]{
      _id,
      title,
      image,
      category,
      categoryClass,
      author,
      publishedAt
    }
  `);

  const countQuery = encodeURIComponent(`
    count(*[_type=="news" && category=="${slug}"])
  `);

  const [postsRes, countRes] = await Promise.all([
    fetch(
      `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${postsQuery}`,
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

  const displayName =
    slug === "sport"
      ? "Sport"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  if (!posts.length && currentPage > 1) return notFound();

  return (
    <div className="navbar-area" style={{ background: "#10284f" }}>
      <Nav1 />

      <div className="container pt-5" style={{ background: "#10284f" }}>
        <h3 className="section-title text-light">
          Latest in {displayName}
        </h3>

        <div className="row">
          {posts.map((post) => {
            const date = new Date(post.publishedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const postUrl = `/${year}/${month}/${day}/${generateSlug(post.title)}`;

            const imageUrl = post.image
              ? `${post.image}?w=400&auto=format`
              : "/assets/img/placeholder.png";

            return (
              <div key={post._id} className="col-lg-3 col-sm-6 mb-4">
                <div className="single-post-wrap style-white">
                  <div className="thumb">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="img-fluid"
                    />

                    <Link
                      href={postUrl}
                      className={`tag-base ${post.categoryClass || "bg-secondary"}`}
                    >
                      {post.category}
                    </Link>
                  </div>

                  <div className="details">
                    <h6 className="title">
                      <Link href={postUrl} className="text-light">
                        {post.title}
                      </Link>
                    </h6>

                    <div className="post-meta-single mt-3">
                      <ul>
                        <li>
                          <i className="fa fa-clock-o"></i>{" "}
                          {`${day}-${month}-${year}`}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/category/${slug}?page=${i + 1}`}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                style={{
                  background:
                    currentPage === i + 1 ? "#ff5d00" : "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
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
