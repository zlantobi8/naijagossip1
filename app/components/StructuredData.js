// components/StructuredData.js
import Head from 'next/head';

export default function StructuredData() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://trendzlib.com.ng/#organization",
    "name": "Trendzlib",

    "url": "https://trendzlib.com.ng/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://trendzlib.com.ng/assets/img/favicon.png"
    }
  };

  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://trendzlib.com.ng/#website",
    "name": "Trendzlib",
      "alternateName": "Trendzlib Nigeria", 
    "url": "https://trendzlib.com.ng/",
    "publisher": {
      "@id": "https://trendzlib.com.ng/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://trendzlib.com.ng/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(orgData)}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteData)}</script>
    </Head>
  );
}
