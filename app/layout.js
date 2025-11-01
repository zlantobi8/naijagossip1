import './globals.css';
import StructuredData from './components/StructuredData';
import TelegramAds from './components/TelegramAds';

const siteTitle = 'Trendzlib - Nigerian Entertainment & Sports News';
const siteDescription =
  'Get the hottest Nigerian celebrity gossip, Nollywood gist, Afrobeats news, BBNaija updates & football stories. Your #1 source for entertainment & sport!';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  themeColor: '#10284f',
  keywords: [
    'Trendzlib',
    'Nigerian entertainment news',
    'Celebrity gossip Nigeria',
    'Nollywood news',
    'Afrobeats news',
    'BBNaija updates',
    'Nigerian football',
    'Victor Osimhen news',
    'Davido news',
    'Wizkid news',
    'Super Eagles',
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.trendzlib.com.ng',
    images: [
      {
        url: '/assets/img/naija2.png',
        width: 1200,
        height: 630,
        alt: 'Trendzlib - Entertainment & Sport News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/assets/img/naija2.png'],
  },
  icons: {
    icon: '/assets/img/favicon.png',
    shortcut: '/assets/img/favicon.png',
    apple: '/assets/img/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="lCDah4iYAgPHYOH9uos6V9W7iTHIQRymXpVT3drRGWQ"
        />
        <meta name="ppck-ver" content="bc09b5ba333835f69797f4f15cc4818e" />
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body>
        <StructuredData />
        <TelegramAds />
        {children}
      </body>
    </html>
  );
}
