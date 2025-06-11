// app/allposts/[slug]/page.tsx
'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Footer from "@/app/Footer";
import Link from "next/link";
import Image from "next/image";
import Nav1 from "@/app/components/Nav1";

export default function AllPosts() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const slugify = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');


  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')       // remove punctuation, keeping spaces and dashes
      .replace(/\s+/g, '-')           // replace spaces with single dash
      .replace(/-+/g, '-')            // collapse multiple dashes into one
      .replace(/^-+|-+$/g, '');
  useEffect(() => {
    const query = encodeURIComponent(`{
      "mainPost": *[_type == "mainPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "sportsPost": *[_type == "sportsPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "educationPost": *[_type == "educationPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "politicsPost": *[_type == "politicsPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "technologyPost": *[_type == "technologyPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "healthPost": *[_type == "healthPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date },
      "celebrityPost": *[_type == "celebrityPost"] | order(date desc) { _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date }
    }`);

    fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_AUTH,
      }
    })
      .then(res => res.json())
      .then(data => {
        const {
          mainPost = [],
          sportsPost = [],
          educationPost = [],
          politicsPost = [],
          technologyPost = [],
          healthPost = [],
          celebrityPost = [],
        } = data.result || {};

        const all = [
          ...mainPost,
          ...sportsPost,
          ...educationPost,
          ...politicsPost,
          ...technologyPost,
          ...healthPost,
          ...celebrityPost
        ];

        const filtered = all.filter(p => slugify(p.category) === slug);
        setPosts(filtered);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="preloader" id="preloader">
    <div className="preloader-inner">
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    </div>
  </div>;
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
            const formattedDate = `${day}-${month}-${year}`;
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
                        <li><i className="fa fa-clock-o"></i> {formattedDate}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Styles go here */}
        <style jsx>{`
        body {
          background-color: #10284f;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          margin: 0;
          padding: 0;
        }

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

      `}</style>
      </div>
      <Footer />
    </div>
  );
}