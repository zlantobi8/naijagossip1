import './globals.css';
import LoadAdSense from './components/LoadAdsense';
import StructuredData from './components/StructuredData';

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
  metadataBase: new URL('https://dailycrust.vercel.app/'),
  openGraph: {
    title: 'Daily Crust',
    description: 'Latest news and celebrity gossip from Nigeria.',
    url: 'https://dailycrust.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://dailycrust.vercel.app/assets/img/naija.png',
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
    images: ['https://dailycrust.vercel.app/assets/img/naija.png'],
  },
  verification: {
    google: 'jgfedbwYYJwFsiiWj38-xP3bU4vmeXLPTqmAY8G49yw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StructuredData/>
        <LoadAdSense />
        {children}
      </body>
    </html>
  );
}
