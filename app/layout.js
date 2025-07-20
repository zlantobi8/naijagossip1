import './globals.css';
import StructuredData from './components/StructuredData';

export const metadata = {
  title: 'Trendzlib - Latest Celebrity & Entertainment News in Nigeria',
  description:
    'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
  keywords: [
    'Trendzlib',
    'Trendzlib',
    'Nigerian news',
    'Celebrity news',
    'Entertainment',
    'Naija gist',
  ],
  metadataBase: new URL('https://trendzlib.com.ng/'),
  openGraph: {
    title: 'Trendzlib',
    description: 'Latest news and celebrity gossip from Nigeria.',
    url: 'https://trendzlib.com.ng/',
    type: 'website',
    images: [
      {
        url: 'https://trendzlib.com.ng/assets/img/naija2.png',
        width: 1200,
        height: 630,
        alt: 'Trendzlib Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendzlib',
    description: 'Latest news and celebrity gossip from Nigeria.',
    images: ['https://trendzlib.com.ng/assets/img/naija2.png'],
  },

  icons: {
    icon: '/assets/img/favicon.png',
    shortcut: '/assets/img/favicon.png',
    apple: '/assets/img/favicon.png',
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="lCDah4iYAgPHYOH9uos6V9W7iTHIQRymXpVT3drRGWQ"
        />
        <link rel="icon" href="/assets/img/favicon.png" />
        {/* You can also add other head elements here if needed */}
      </head>
      <body>
        <StructuredData />
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

