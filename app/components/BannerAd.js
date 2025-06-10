'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
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

  if (adIndex === null) return null; // Wait for useEffect to set the index

if (!slicepost || slicepost.length === 0 || !slicepost[adIndex]) {
  return null; // or a loader, fallback component, etc.
}

const ad = slicepost[adIndex];
const formattedDate = new Date(ad.date).toLocaleDateString('en-GB');


  return (
    <div className="banner-inner pt-5">
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="col-lg-6">
            <div className="thumb after-left-top">
              <img src={ad.image} alt="img" width={500} height={300} />
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-6 align-self-center">
            <div className="banner-details mt-4 mt-lg-0">
              <div className="post-meta-single">
                <ul>
                  <li>
                    <a className={`tag-base ${ad.categoryClass}`} href="#">
                      {ad.category}
                    </a>
                  </li>
                  <li className="date">
                    <i className="fa fa-clock-o" /> {formattedDate}
                  </li>
                </ul>
              </div>
              <h2>{ad.title}</h2>
              <p>{ad.description.slice(0, 200)} .....</p>
              <button
                className="btn btn-blue"
                onClick={() => router.push(`/${generateSlug(ad.title)}/detail`)}
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
