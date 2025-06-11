'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Section({ title, id, posts = [] }) {
  const router = useRouter();

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')       // remove punctuation, keeping spaces and dashes
    .replace(/\s+/g, '-')           // replace spaces with single dash
    .replace(/-+/g, '-')            // collapse multiple dashes into one
    .replace(/^-+|-+$/g, '');       // trim leading/trailing dashes


  const handleSeeMore = () => {
    const slug = generateSlug(title); // e.g., "politics"
    router.push(`/category/${slug}`);
  };

  return (
    <div className="bg-sky pd-top-70 pd-bottom-50" id={id}>
      <div className="container1">
        <div className="line" />
        <div className="text" style={{ fontSize: 'x-large' }}>{title}</div>
        <div className="line" />
      </div>

      <br />

      <div className="container">
        <div className="row">
          {posts.slice(0, 8).map((post, index) => {
            const slug = generateSlug(post.title);
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${day}-${month}-${year}`;
            const postUrl = `/${year}/${month}/${day}/${slug}`;

            return (
              <div className="col-lg-3 col-sm-6 mb-4" key={index}>
                <div
                  className="single-post-wrap"
                  onClick={() => router.push(postUrl)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="thumb">
                    <img src={post.image} alt={post.title || 'Post image'} className="img-fluid" />
                    <p className="btn-date">
                      <i className="fa fa-clock-o"></i> {formattedDate}
                    </p>
                  </div>
                  <div className="details">
                    <h6 className="title">
                      <Link href={postUrl} className="text-dark">
                        {post.title}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          margin: '1rem auto',
          backgroundColor: 'blue',
          width: 'fit-content',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleSeeMore}
      >
        <span style={{ color: 'white' }}>See More</span>
      </div>
    </div>
  );
}
