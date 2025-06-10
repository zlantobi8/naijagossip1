'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Section({ title, id, posts = [] }) {
  const router = useRouter();

  const generateSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const handleSeeMore = () => {
  const slug = generateSlug(title); // e.g., "politics"
  router.push(`/${slug}/allposts`);
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
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

            return (
              <div className="col-lg-3 col-sm-6 mb-4" key={index}>
                <div
                  className="single-post-wrap"
                  onClick={() => router.push(`/${slug}/detail`)}
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
                      <Link href={`/${slug}/detail`} className="text-dark">
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
