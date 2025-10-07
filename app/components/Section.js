'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Section({ title, id, posts = [] }) {
  const router = useRouter();




  function generateSlug(text) {
    // Convert to lowercase and trim leading/trailing whitespace
    let slug = text.toLowerCase().trim();

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



const handleSeeMore = async () => {
  try {
    // Show the rewarded interstitial ad
    await show_10003329();
    
    // Reward the user (optional)
    alert('You have seen an ad!');

    // Generate the slug and navigate
    const slug = generateSlug(title);
    router.push(`/category/${slug}`);
  } catch (error) {
    console.error('Ad failed to load or was skipped:', error);
    // Optionally still allow navigation if ad fails
    const slug = generateSlug(title);
    router.push(`/category/${slug}`);
  }
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
            const optimizedUrl = post.image + '?w=400&auto=format';
            return (
              <div className="col-lg-3 col-sm-6 mb-4" key={index}>
                <div
                  className="single-post-wrap"
                  onClick={() => router.push(postUrl)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="thumb">
                    <Image
                      src={optimizedUrl}
                      alt={post.title || 'Post image'}
                      width={400}               // Or adjust to your preferred width
                      height={250}              // Adjust height as needed
                      className="img-fluid"
                      priority={false}          // Only set to true for important images
                      loading="lazy"
                    />
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
          userSelect: 'none', // prevent highlighting the whole button
        }}
        onClick={handleSeeMore}
      >
        <span style={{ color: 'white', userSelect: 'none' }}>See More</span>
      </div>

    </div>
  );
}
