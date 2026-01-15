'use client'; // ensures this runs only on the client

import { useEffect } from 'react';
import Script from 'next/script';

export default function Banner() {
  useEffect(() => {
    // Make sure AdProvider exists, then push the serve command
    if (window.AdProvider) {
      window.AdProvider.push({ serve: {} });
    }
  }, []);

  return (
    <>
      {/* Load ad provider script asynchronously */}
      <Script
        src="https://a.magsrv.com/ad-provider.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.AdProvider) {
            window.AdProvider.push({ serve: {} });
          }
        }}
      />

      {/* Ad container */}
      <ins className="eas6a97888e14" data-zoneid="5829954"></ins>
    </>
  );
}
