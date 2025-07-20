// components/StructuredData.js
import Head from 'next/head';

export default function StructuredData() {
    const orgData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Trendzlib",
        "url": "https://Trendzlib.vercel.app/",
        "logo": "https://Trendzlib.vercel.app/assets/img/naija2.png"
    };
    const webSiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Trendzlib",
        "url": "https://Trendzlib.vercel.app/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://Trendzlib.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Head>
            <script type="application/ld+json">
                {JSON.stringify(orgData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(webSiteData)}
            </script>
        </Head>

    );
}
