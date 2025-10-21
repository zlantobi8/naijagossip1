'use client';
import Script from 'next/script';

export default function AdContainer() {
  return (
    <div style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
      {/* The ad will be loaded here */}
      <div id="container-86b94f0c9dfdea7c5a315c12a64c0831"></div>

      {/* Load the ad script */}
      <Script
        id="effectivegatecpm-ad"
        async
        data-cfasync="false"
        src="//pl27893921.effectivegatecpm.com/86b94f0c9dfdea7c5a315c12a64c0831/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
