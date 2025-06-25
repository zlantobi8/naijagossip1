import './globals.css';
import LoadAdSense from './components/LoadAdsense';
import ProgressBar1 from './components/ClientProgressBar';

export const metadata = {
  title: 'Naija Gossip - Latest Celebrity & Entertainment News in Nigeria',
  description:
    'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
  keywords: [
    'Naija Gossip',
    'naijagossip',
    'Nigerian news',
    'Celebrity news',
    'Entertainment',
    'Naija gist',
  ],
  metadataBase: new URL('https://naijagossip.vercel.app'),
  openGraph: {
    title: 'Naija Gossip',
    description: 'Latest news and celebrity gossip from Nigeria.',
    url: 'https://naijagossip.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://naijagossip.vercel.app/assets/img/naijagossip-og.jpg', // <-- Replace with a 1200x630 JPG
        width: 1200,
        height: 630,
        alt: 'Naija Gossip Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naija Gossip',
    description: 'Latest news and celebrity gossip from Nigeria.',
    images: ['https://naijagossip.vercel.app/assets/img/naijagossip-og.jpg'],
  },
  verification: {
    google: 'jgfedbwYYJwFsiiWj38-xP3bU4vmeXLPTqmAY8G49yw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Manual SEO tags for better indexing */}
        <title>Naija Gossip - Latest Celebrity & Entertainment News in Nigeria</title>
        <meta
          name="description"
          content="Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!"
        />
        <meta
          name="keywords"
          content="Naija Gossip, naijagossip, Nigerian news, Celebrity news, Entertainment, Naija gist"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Naija Gossip" />
        <meta
          property="og:description"
          content="Latest news and celebrity gossip from Nigeria."
        />
        <meta
          property="og:image"
          content="https://naijagossip.vercel.app/assets/img/naijagossip-og.jpg"
        />
        <meta property="og:url" content="https://naijagossip.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naija Gossip" />
        <meta
          name="twitter:description"
          content="Latest news and celebrity gossip from Nigeria."
        />
        <meta
          name="twitter:image"
          content="https://naijagossip.vercel.app/assets/img/naijagossip-og.jpg"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="/assets/img/favicon.png"
          type="image/x-icon"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Naija Gossip",
              url: "https://naijagossip.vercel.app/",
              logo:
                "https://naijagossip.vercel.app/assets/img/naijagossip-og.jpg",
            }),
          }}
        />
      </head>

      <body>
        <LoadAdSense />
     
        {children}
     
      </body>
    </html>
  );
}
