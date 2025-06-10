// components/MainPosts.jsx
'use client'; // Only if you're using this in a client component

import Link from 'next/link';
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
function formatDate(rawDate) {
  const date = new Date(rawDate);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

const MainPosts = ({ posts = [] }) => {
  const visiblePosts = posts.slice(0, 5);
  const router = useRouter();
  return (
    <div className="container">
      <h3 style={{ color: 'white' }} id="latestNews">Latest News</h3>
      <div className="row" id="postsRow">
        {visiblePosts.map((post, index) => (
          <div className="col-lg-3 col-sm-6" key={post._id} data-index={index}>
            <div className="single-post-wrap style-white">
              {/* Image and Category */}
              <div className="thumb">
                <img src={post.image} alt={post.title || "main post image"} />
                <Link href="#" className={`tag-base ${post.categoryClass}`}>
                  {post.category}
                </Link>
              </div>

              {/* Title and Date */}
              <div className="details">
                <h6 className="title">
                  <Link  href={`/${generateSlug(post.title)}/detail`} className="text-light">
                    {post.title}
                  </Link>
                </h6>

                <div className="post-meta-single mt-3">
                  <ul>
                    <li><i className="fa fa-clock-o"></i> {formatDate(post.date)}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPosts;
