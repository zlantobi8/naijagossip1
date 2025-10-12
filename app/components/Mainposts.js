'use client';

import Image from 'next/image';
import Link from 'next/link';

function formatDate(rawDate) {
  const date = new Date(rawDate);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}

function generateSlug(title) {
  let slug = title.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

const MainPosts = ({ posts = [] }) => {
  const visiblePosts = posts.slice(0, 5);

  return (
    <div className="container">
      <h1 style={{ color: 'white' }} id="latestNews">Latest News</h1>
      <div className="row" id="postsRow">
        {visiblePosts
          .sort((a, b) => new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date))
          .map((post, index) => {
            // ✅ FIXED: Use publishedAt consistently
            const dateObj = new Date(post.publishedAt || post.date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const slug = generateSlug(post.title);

            return (
              <div className="col-lg-3 col-sm-6" key={post._id} data-index={index}>
                <div className="single-post-wrap style-white">
                  {/* Image and Category */}
                  <div className="thumb">
                    <Image
                      src={post.image}
                      alt={post.title || 'Main post image'}
                      width={400}
                      height={250}
                      priority
                      className="img-fluid"
                      unoptimized
                    />
                    <Link href="#" className={`tag-base ${post.categoryClass || 'bg-primary'}`}>
                      {post.category}
                    </Link>
                  </div>

                  {/* Title and Date */}
                  <div className="details">
                    <h6 className="title">
                      <Link
                        href={`/${year}/${month}/${day}/${slug}`}
                        className="text-light"
                      >
                        {post.title}
                      </Link>
                    </h6>

                    <div className="post-meta-single mt-3">
                      <ul>
                        {/* ✅ FIXED: Use publishedAt */}
                        <li>
                          <i className="fa fa-clock-o"></i> {formatDate(post.publishedAt || post.date)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MainPosts;