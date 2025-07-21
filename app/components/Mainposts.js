'use client';

import Image from 'next/image';
import Link from 'next/link';

function formatDate(rawDate) {
  const date = new Date(rawDate);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
}



function generateSlug(title) {
  // Convert to lowercase and trim leading/trailing whitespace
  let slug = title.toLowerCase().trim();

  // Replace accented characters with their non-accented equivalents
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces, underscores, and other non-alphanumeric characters (except hyphens) with a single hyphen
  slug = slug.replace(/[^a-z0-9 -]/g, "")
             .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
             .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

const MainPosts = ({ posts = [] }) => {
  const visiblePosts = posts.slice(0, 5);


  return (
    <div className="container">
      <h3 style={{ color: 'white' }} id="latestNews">Latest News</h3>
      <div className="row" id="postsRow">
        {visiblePosts.map((post, index) => {
          const dateObj = new Date(post.date);
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
                    width={400} // Set an appropriate width
                    height={250} // Set an appropriate height
                    priority
                    className="img-fluid" // Optional if you're using Bootstrap or want responsive sizing
                  />
                  <Link href="#" className={`tag-base ${post.categoryClass}`}>
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
                      <li><i className="fa fa-clock-o"></i> {formatDate(post.date)}</li>
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
