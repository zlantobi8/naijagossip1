// components/Bannerj.js
"use client";

import Script from "next/script";

export default function Bannerj() {
  return (
    <div style={{ width: "300px", height: "100px", margin: "2rem auto" }}>
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
