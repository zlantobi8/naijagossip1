import Footer from "@/app/Footer";
import Nav1 from "@/app/components/Nav1";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Map slugs to Sanity _type
const slugToSanityType = {
  sport: "sportsPost",
  education: "educationPost",
  politics: "politicsPost",
  metro: "technologyPost",
  entertainment: "healthPost",  // still healthPost in Sanity
  celebrity: "celebrityPost",
  general: "mainPost",
};

const sanityToDisplayName = {
  sportsPost: "Sport",
  educationPost: "Education",
  politicsPost: "Politics",
  technologyPost: "Metro",
  healthPost: "Entertainment",   // 👈 force correct display
  celebrityPost: "Celebrity",
  mainPost: "General",
};


const pageSize = 8;

function generateSlug(text) {
  let slug = text.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const postType = slugToSanityType[slug] || "mainPost";
  const displayName = sanityToDisplayName[postType] || slug; // ✅ fallback safe

  const currentPage = parseInt(searchParams?.page || "1");
  const canonicalUrl =
    currentPage === 1
      ? `https://trendzlib.com.ng/category/${slug}`
      : `https://trendzlib.com.ng/category/${slug}?page=${currentPage}`;

  return {
    title: `Latest in ${displayName} - TrendzLib`,   // ✅ friendly category name
    description: `Read the latest articles in ${displayName} on TrendzLib.`, // ✅ friendly category name
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


export default async function AllPosts({ params, searchParams }) {
  const slug = params.slug;
  const postType = slugToSanityType[slug] || "mainPost";
  const currentPage = parseInt(searchParams?.page || "1");
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const query = encodeURIComponent(
    `*[_type == "${postType}"] | order(date desc) [${start}...${end}] {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    }`
  );

  const countQuery = encodeURIComponent(`count(*[_type == "${postType}"])`);

  const [postsRes, countRes] = await Promise.all([
    fetch(
      `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_AUTH,
        },
        next: { revalidate: 30 },
      }
    ),
    fetch(
      `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${countQuery}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_AUTH,
        },
        next: { revalidate: 30 },
      }
    ),
  ]);

  const postsData = await postsRes.json();
  const countData = await countRes.json();

  const posts = postsData.result || [];
  const totalPages = Math.ceil(countData.result / pageSize);

  if (!posts.length) return notFound();

  return (
    <div className="navbar-area" style={{ background: "#10284f" }}>
      <Nav1 />
      <div className="container pt-5" style={{ background: "#10284f" }}>
        <h3 className="section-title text-light">
          Latest in {sanityToDisplayName[postType] || slug}
        </h3>

        <div className="row">
          {posts.map((post) => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const postUrl = `/${year}/${month}/${day}/${generateSlug(
              post.title
            )}`;
            const optimizedUrl = post.image + "?w=400&auto=format";

            return (
              <div key={post._id} className="col-lg-3 col-sm-6">
                <div className="single-post-wrap style-white">
                  <div className="thumb">
                    <Image
                      src={optimizedUrl}
                      alt={post.title || "Post image"}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="img-fluid"
                    />
                    <a className={`tag-base ${post.categoryClass}`}>
                      {post.category}
                    </a>
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

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/category/${slug}?page=${i + 1}`}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              style={{
                background: "none",
                border: "1px solid #fff",
                color: "#fff",
                padding: "6px 12px",
                margin: "0 4px",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor:
                  currentPage === i + 1 ? "#ff5d00" : "transparent",
                borderColor: currentPage === i + 1 ? "#ff5d00" : "#fff",
              }}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
