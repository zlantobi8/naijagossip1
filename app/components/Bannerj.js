// components/Bannerj.js
"use client"; // must be client component

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Bannerj() {
  const bannerRef = useRef(null);

  useEffect(() => {
    // make sure window.aclib exists
    if (typeof window !== "undefined" && window.aclib) {
      window.aclib.runBanner({
        zoneId: "10799786",
        container: bannerRef.current, // render inside this div
      });
    }
  }, []);

  return (
    <>
      {/* Step 1: Load ACLib library */}
      <Script
        id="aclib"
        src="//acscdn.com/script/aclib.js"
        strategy="beforeInteractive"
      />

      {/* Step 2: Banner container */}
      <div
        ref={bannerRef}
        style={{ width: "300px", height: "100px", margin: "2rem auto" }}
      ></div>
    </>
  );
}
