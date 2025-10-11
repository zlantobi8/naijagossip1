import './globals.css';
import StructuredData from './components/StructuredData';
import Script from 'next/script';

const siteTitle = 'Trendzlib - Latest Nigerian News, Gossip & Entertainment';
const siteDescription = 'Stay updated with the hottest Nigerian gossip, celebrity news, politics, sports, education and entertainment stories. Your #1 source for Naija gist!';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'Trendzlib',
    'Nigerian news',
    'Celebrity news',
    'Entertainment',
    'Naija gist',
  ],
  metadataBase: new URL('https://trendzlib.com.ng'),
  openGraph: {
    title: 'Trendzlib - Latest Nigerian News, Gossip & Trends',
    description: 'Catch up on trending Naija news, celebrity gossip, politics, health, education and more. Fresh posts daily!',
    url: 'https://trendzlib.com.ng',
    type: 'website',
    images: [
      {
        url: 'https://trendzlib.com.ng/assets/img/naija2.png',
        width: 1200,
        height: 630,
        alt: 'Trendzlib Logo',
      },
    ],
    siteName: 'Trendzlib',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendzlib - Naija Gossip & Entertainment',
    description: 'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
    images: ['https://trendzlib.com.ng/assets/img/naija2.png'],
  },
  icons: {
    icon: '/assets/img/favicon.png',
    shortcut: '/assets/img/favicon.png',
    apple: '/assets/img/favicon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="lCDah4iYAgPHYOH9uos6V9W7iTHIQRymXpVT3drRGWQ"
        />
        <Script
          id="ad-sdk"
          src="https://libtl.com/sdk.js"
          strategy="afterInteractive"
          data-zone="10003329"
          data-sdk="show_10003329"
          onLoad={() => console.log("Ad SDK loaded")}
        />
        <link rel="icon" href="/assets/img/favicon.png" />
        {/* You can also add other head elements here */}
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}