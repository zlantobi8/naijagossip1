// app/allposts/[slug]/page.js

import Footer from "@/app/Footer";
import Nav1 from "@/app/components/Nav1";
import Link from "next/link";
import { notFound } from "next/navigation";

const slugToSanityType = {
  sport: "sportsPost",
  education: "educationPost",
  politics: "politicsPost",
  technology: "technologyPost",
  entertainment: "healthPost",
  celebrity: "celebrityPost",
  general: "mainPost",
};

const pageSize = 8;

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function AllPosts({ params, searchParams }) {
  const slug = params.slug;
  const postType = slugToSanityType[slug] || "mainPost";
  const currentPage = parseInt(searchParams?.page || "1");
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const query = encodeURIComponent(`*[_type == "${postType}"] | order(date desc) [${start}...${end}] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  }`);

  const countQuery = encodeURIComponent(`count(*[_type == "${postType}"])`);

  const [postsRes, countRes] = await Promise.all([
    fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_AUTH,
      },
      next: { revalidate: 30 },
    }),
    fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${countQuery}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_AUTH,
      },
      next: { revalidate: 30 },
    }),
  ]);

  const postsData = await postsRes.json();
  const countData = await countRes.json();

  const posts = postsData.result || [];
  const totalPages = Math.ceil(countData.result / pageSize);

  if (!posts.length) return notFound();

  return (
    <div className="navbar-area" style={{ background: '#10284f' }}>
      <Nav1 />
      <div className="container pt-5" style={{ background: '#10284f' }}>
        <h3 className="section-title  text-light">Latest in {slug.charAt(0).toUpperCase() + slug.slice(1)}</h3>
        <div className="row">
          {posts.map((post) => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const postUrl = `/${year}/${month}/${day}/${generateSlug(post.title)}`;

            return (
              <div key={post._id} className="col-lg-3 col-sm-6">
                <div className="single-post-wrap style-white">
                  <div className="thumb">
                    <img src={post.image} alt={post.title} />
                    <a className={`tag-base ${post.categoryClass}`}>{post.category}</a>
                  </div>
                  <div className="details">
                    <h6 className="title">
                      <Link href={postUrl} className="text-light">
                        {post.title}
                      </Link>
                    </h6>
                    <div className="post-meta-single mt-3">
                      <ul>
                        <li><i className="fa fa-clock-o"></i> {`${day}-${month}-${year}`}</li>
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
              href={`/allposts/${slug}?page=${i + 1}`}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>

        {/* You can move your existing styles here */}
      </div>
      <Footer />
    </div>
  );
}
