'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';




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
  const dateObj = new Date(ad.date);
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
              {

              }
              <Image
                src={optimizedUrl}
                alt={ad.title}  // ✅ This uses the actual article title from the ad object
                width={480}
                height={270}
                priority // 💥 This tells Next.js to load it early
                className="img-fluid" // Optional: if you're using Bootstrap or want responsiveness
              />
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
