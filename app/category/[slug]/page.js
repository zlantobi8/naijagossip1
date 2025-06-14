// app/allposts/[slug]/page.tsx
'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Footer from "@/app/Footer";
import Link from "next/link";
import Nav1 from "@/app/components/Nav1";

export default function AllPosts() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const slugToSanityType = {
    sport: "sportsPost",
    education: "educationPost",
    politics: "politicsPost",
    technology: "technologyPost",
    health: "healthPost",
    celebrity: "celebrityPost",
    general: "mainPost",
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postType = slugToSanityType[slug] || "mainPost";
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      console.log(postType);
      const query = encodeURIComponent(`*[_type == "${postType}"] | order(date desc) [${start}...${end}] {
        _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
      }`);

      const countQuery = encodeURIComponent(`count(*[_type == "${postType}"])`);

      const [postsRes, countRes] = await Promise.all([
        fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_AUTH,
          }
        }),
        fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${countQuery}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_AUTH,
          }
        })
      ]);

      const postsData = await postsRes.json();
      const countData = await countRes.json();

      setPosts(postsData.result || []);
      setTotalPages(Math.ceil(countData.result / pageSize));
      setLoading(false);
    };

    fetchPosts();
  }, [slug, currentPage]);

  if (loading) {
    return (
      <div className="preloader" id="preloader">
        <div className="preloader-inner">
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) return <p>No posts found for {slug}</p>;

  return (
    <div className="navbar-area" style={{ background: '#10284f' }}>
      <Nav1 />

      <div className="container pt-5" style={{ background: '#10284f' }}>
        <h3 className="section-title">Latest in {slug.charAt(0).toUpperCase() + slug.slice(1)}</h3>
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
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <style jsx>{`
          h3.section-title {
            color: white;
            padding-top: 30px;
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          @media (max-width: 768px) {
            h3.section-title {
              padding-left: 20px;
              font-size: 1.5rem;
            }
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin-left: -15px;
            margin-right: -15px;
          }

          .col-lg-3 {
            width: 25%;
            padding-left: 15px;
            padding-right: 15px;
            box-sizing: border-box;
          }

          .col-sm-6 {
            width: 50%;
            padding-left: 15px;
            padding-right: 15px;
            box-sizing: border-box;
          }

          .single-post-wrap {
            background-color: #1b3a6f;
            padding: 15px;
            border-radius: 8px;
            color: white;
            margin-bottom: 20px;
          }

          .thumb img {
            width: 100%;
            height: auto;
            border-radius: 6px;
          }

          .tag-base {
            display: inline-block;
            margin-top: 10px;
            padding: 3px 8px;
            background-color: #ff5d00;
            color: white;
            font-size: 0.8rem;
            border-radius: 3px;
          }

          .details .title {
            margin-top: 10px;
            font-size: 1rem;
          }

          .details .title a {
            color: white;
            text-decoration: none;
          }

          .post-meta-single ul {
            padding: 0;
            list-style: none;
            margin-top: 10px;
          }

          .post-meta-single li {
            font-size: 0.8rem;
          }

          @media (max-width: 576px) {
            .col-sm-6, .col-lg-3 {
              width: 100% !important;
            }
          }

          .pagination {
            margin-top: 30px;
            text-align: center;
          }

          .page-btn {
            background: none;
            border: 1px solid #fff;
            color: #fff;
            padding: 6px 12px;
            margin: 0 4px;
            cursor: pointer;
            border-radius: 4px;
          }

          .page-btn.active {
            background-color: #ff5d00;
            border-color: #ff5d00;
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
}
