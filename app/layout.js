import './globals.css';
import StructuredData from './components/StructuredData';

export const metadata = {
  title: 'Trendzlib - Naija Gossip & Entertainment',
  description:
    'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
  keywords: [
    'Trendzlib',
    'Nigerian news',
    'Celebrity news',
    'Entertainment',
    'Naija gist',
  ],
  metadataBase: new URL('https://trendzlib.com.ng'),
  openGraph: {
    title: 'Trendzlib - Latest Nigerian News, Gossip & Trends', // 🔧 match full title
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
    title: 'Trendzlib - Naija Gossip & Entertainment', // 🔧 match full title
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
        <meta
          name="google-site-verification"
          content="lCDah4iYAgPHYOH9uos6V9W7iTHIQRymXpVT3drRGWQ"
        />

      <script src='//libtl.com/sdk.js' data-zone='10003329' data-sdk='show_10003329'></script>
        <link rel="icon" href="/assets/img/favicon.png" />
        {/* You can also add other head elements here if needed */}
        <StructuredData />
      </head>
      <body>

        {children}
        <script
          type="text/javascript"
          src="//cdn.runative-syndicate.com/sdk/v1/bi.js"
          data-ts-spot="f86939fb1420439eb7534dd80e0b2ccb"
          data-ts-width="728"
          data-ts-height="90"
          async
          defer
        ></script>
        
      </body>
    </html>
  );
}

