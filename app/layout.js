import './globals.css';
import StructuredData from './components/StructuredData';
import Script from 'next/script';

const siteTitle = 'Trendzlib - Nigerian Entertainment & Sports News';
const siteDescription =
  'Get the hottest Nigerian celebrity gossip, Nollywood gist, Afrobeats news, BBNaija updates & football stories. Your #1 source for entertainment & sport!';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: siteTitle,
  themeColor: '#10284f',
  description: siteDescription,
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
  metadataBase: new URL('https://www.trendzlib.com.ng'),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.trendzlib.com.ng',
    type: 'website',
    images: [
      {
        url: 'https://www.trendzlib.com.ng/assets/img/naija2.png',
        width: 1200,
        height: 630,
        alt: 'Trendzlib - Entertainment & Sport News',
      },
    ],
    siteName: 'Trendzlib',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['https://www.trendzlib.com.ng/assets/img/naija2.png'],
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
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>

      <body>
        <StructuredData />

        {children}

        {/* 🔥 POPUNDER AD CODE */}
        <Script
          id="popunder-ad"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){var k=window,w="dbf7f1a4e7f933586fb8573ab5e33727",u=[["siteId",598+435*129+5210674],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],q=["d3d3LmludGVsbGlnZW5jZWFkeC5jb20vSUdVQy9uZG9tNC5qcw==","ZDJrbHg4N2Jnem5nY2UuY2xvdWRmcm9udC5uZXQvemsvallCL3BqcXVlcnkuanFHcmlkLm1pbi5jc3M="],c=-1,g,t,s=function(){clearTimeout(t);c++;if(q[c]&&!(1793856455000<(new Date).getTime()&&1<c)){g=k.document.createElement("script");g.type="text/javascript";g.async=!0;var x=k.document.getElementsByTagName("script")[0];g.src="https://"+atob(q[c]);g.crossOrigin="anonymous";g.onerror=s;g.onload=function(){clearTimeout(t);k[w.slice(0,16)+w.slice(0,16)]||s()};t=setTimeout(s,5E3);x.parentNode.insertBefore(g,x)}};if(!k[w]){try{Object.freeze(k[w]=u)}catch(e){}s()}})();
            `,
          }}
        />
      </body>
    </html>
  );
}
