// components/Bannerj.js
"use client";

import Script from "next/script";

export default function Bannerj() {
  return (
    <div>
      {/* Run the banner */}
      <Script id="banner-run" strategy="afterInteractive">
        {`
          if(window.aclib){
            aclib.runBanner({ zoneId: '10799786' });
          }
        `}
      </Script>
    </div>
  );
}
