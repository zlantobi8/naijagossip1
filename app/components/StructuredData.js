export default function StructuredData() {

  const orgData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Trendzlib",
    "url": "https://www.trendzlib.com.ng/",
    "logo": "https://www.trendzlib.com.ng/assets/img/naija2.png",
    "sameAs": [
      "https://www.instagram.com/trendzlib",
      "https://www.linkedin.com/company/trendzlib",
      "https://twitter.com/trendzlib",
      "https://www.facebook.com/officialtrendzlib"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-706-104-3812",
      "contactType": "Customer Service",
      "email": "newsroom@trendzlib.com"
    }
  };

  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trendzlib",
    "url": "https://trendzlib.com.ng/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://trendzlib.com.ng/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteData) }}
      />
    </>
  );
}