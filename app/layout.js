import './globals.css';
import LoadAdSense from './components/LoadAdsense';
export const metadata = {
  title: 'Daily Crust - Latest Celebrity & Entertainment News in Nigeria',
  description:
    'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
  keywords: [
    'Daily Crust',
    'dailycrust',
    'Nigerian news',
    'Celebrity news',
    'Entertainment',
    'Naija gist',
  ],
  metadataBase: new URL('https://naijagossip.vercel.app'),
  openGraph: {
    title: 'Daily Crust',
    description: 'Latest news and celebrity gossip from Nigeria.',
    url: 'https://naijagossip.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://naijagossip.vercel.app/assets/img/naija.png',
        width: 1200,
        height: 630,
        alt: 'Daily Crust Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Crust',
    description: 'Latest news and celebrity gossip from Nigeria.',
    images: ['https://naijagossip.vercel.app/assets/img/naija.png'],
  },
  verification: {
    google: 'jgfedbwYYJwFsiiWj38-xP3bU4vmeXLPTqmAY8G49yw',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
  <title>Daily Crust - Latest Celebrity & Entertainment News in Nigeria</title>
  <meta name="description" content="Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!" />
  <meta name="keywords" content="Daily Crust, dailycrust, Nigerian news, Celebrity news, Entertainment, Naija gist" />

  {/* Open Graph */}
  <meta property="og:title" content="Daily Crust" />
  <meta property="og:description" content="Latest news and celebrity gossip from Nigeria." />
  <meta property="og:image" content="https://naijagossip.vercel.app/assets/img/naija.png" />
  <meta property="og:url" content="https://naijagossip.vercel.app/" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Daily Crust" />
  <meta name="twitter:description" content="Latest news and celebrity gossip from Nigeria." />
  <meta name="twitter:image" content="https://naijagossip.vercel.app/assets/img/naija.png" />

  {/* Favicon */}
  <link rel="icon" href="/assets/img/favicon.png" type="image/x-icon" />

  {/* Structured Data: Organization */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Daily Crust",
      "url": "https://naijagossip.vercel.app/",
      "logo": "https://naijagossip.vercel.app/assets/img/naija.png"
    })
  }} />

  {/* Structured Data: WebSite Search */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Daily Crust",
      "url": "https://naijagossip.vercel.app/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://naijagossip.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })
  }} />

  {/* Structured Data: Navigation */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "name": ["Latest News", "Politics", "Entertainment", "Sport"],
      "url": [
        "https://naijagossip.vercel.app/latest",
        "https://naijagossip.vercel.app/category/politics",
        "https://naijagossip.vercel.app/category/entertainment",
        "https://naijagossip.vercel.app/category/sport"
      ]
    })
  }} />
</head>


      <body>
        <LoadAdSense />
     
        {children}
     
      </body>
    </html>
  );
}
