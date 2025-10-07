'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import createAdHandler from 'monetag-tg-sdk'; // ✅ Import SDK

export default function Section({ title, id, posts = [] }) {
  const router = useRouter();

  // Your Monetag Rewarded Interstitial Zone ID
  const REWARDED_ZONE_ID = '10003329';

  // Initialize ad handler
  const adHandler = createAdHandler(REWARDED_ZONE_ID);

  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    // Preload ad for faster experience
    adHandler({ type: 'preload', ymid: 'preload-event' })
      .then(() => setAdReady(true))
      .catch(() => console.warn('Ad preload failed'));

    // Initialize Telegram SDK if available
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  function generateSlug(text) {
    let slug = text.toLowerCase().trim();
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    return slug.replace(/^-+|-+$/g, "");
  }

  const handleSeeMore = async () => {
    try {
      // Show ad
      await adHandler({ ymid: 'user-123' });
      alert('🎉 You have seen an ad!');
    } catch (error) {
      console.error('Ad failed or was skipped:', error);
    } finally {
      // Always navigate after
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
                      width={400}
                      height={250}
                      className="img-fluid"
                      priority={false}
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
          backgroundColor: adReady ? 'blue' : 'gray',
          width: 'fit-content',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: adReady ? 'pointer' : 'not-allowed',
        }}
        onClick={adReady ? handleSeeMore : undefined}
      >
        <span style={{ color: 'white' }}>
          {adReady ? 'See More' : 'Loading Ad...'}
        </span>
      </div>
    </div>
  );
}
