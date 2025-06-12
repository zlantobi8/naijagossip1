import './globals.css';
import LoadAdSense from './components/LoadAdsense';
import RouteProgress from './components/RouteProgress';

export const metadata = {
  title: 'Naija Gossip - Latest Celebrity & Entertainment News in Nigeria',
  description:
    'Stay updated with the hottest Nigerian gossip, celebrity news, and entertainment stories. Your #1 source for Naija gist!',
  keywords: [
    'Naija Gossip',
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
        url: '/assets/img/lll-removebg-preview.png',
        width: 800,
        height: 600,
        alt: 'Naija Gossip Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naija Gossip',
    description: 'Latest news and celebrity gossip from Nigeria.',
    images: ['/assets/img/lll-removebg-preview.png'],
  },
  verification: {
    google: 'jgfedbwYYJwFsiiWj38-xP3bU4vmeXLPTqmAY8G49yw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <LoadAdSense />
        <RouteProgress />
        {children}
        {/* <Footer /> can be placed here if needed globally */}
      </body>
    </html>
  );
}
