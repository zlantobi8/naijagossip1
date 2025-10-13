'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function generateSlug(title) {
  let slug = title.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

export default function BannerAd({ slicepost }) {
  const [adIndex, setAdIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let sessionAd = sessionStorage.getItem('randomAdsession');
    if (sessionAd === null) {
      const random = Math.floor(Math.random() * slicepost.length);
      sessionStorage.setItem('randomAdsession', random);
      setAdIndex(random);
    } else {
      setAdIndex(parseInt(sessionAd, 10));
    }
  }, [slicepost]);

  if (adIndex === null) return null;
  if (!slicepost || slicepost.length === 0 || !slicepost[adIndex]) return null;

  const ad = slicepost[adIndex];
  
  // ✅ FIXED: Use publishedAt instead of date
  const dateObj = new Date(ad.publishedAt || ad.date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const slug = generateSlug(ad.title);
  const formattedDate = dateObj.toLocaleDateString('en-GB');
  const optimizedUrl = ad.image + '?w=400&auto=format';

  return (
    <div className="banner-inner pt-5">
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="col-lg-6">
            <div className="thumb after-left-top">
              <Image
                src={optimizedUrl}
                alt={ad.title}
                width={480}
                height={270}
                priority
                className="img-fluid"
                loading="lazy"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-6 align-self-center">
            <div className="banner-details mt-4 mt-lg-0">
              <div className="post-meta-single">
                <ul>
                  <li>
                    <a className={`tag-base ${ad.categoryClass || 'bg-primary'}`} href="#">
                      {ad.category}
                    </a>
                  </li>
                  <li className="date">
                    <i className="fa fa-clock-o" /> {formattedDate}
                  </li>
                </ul>
              </div>
              <h2>{ad.title}</h2>
              {/* ✅ FIXED: Use content instead of description */}
              <p>{(ad.content || '').slice(0, 200)}...</p>
              <button
                className="btn btn-blue"
                onClick={() =>
                  router.push(`/${year}/${month}/${day}/${slug}`)
                }
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}