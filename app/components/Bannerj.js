import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Make sure aclib exists
    if (window.aclib) {
      // Run auto tag
      window.aclib.runAutoTag({
        zoneId: 'nwdd8udvjv',
      });

      // Run banner inside the div
      if (bannerRef.current) {
        window.aclib.runBanner({
          zoneId: '10799786',
          container: bannerRef.current,
        });
      }
    }
  }, []);

  return (
    <>
      {/* Load the aclib library first */}
      <Script
        src="https://example.com/aclib.js" // <-- Replace with actual aclib JS URL
        strategy="beforeInteractive"
      />

      {/* Banner container */}
      <div ref={bannerRef}></div>
    </>
  );
}
