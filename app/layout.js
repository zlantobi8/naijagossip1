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

        
  <Script
  id="popunder-ad"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
(function(){
  var z=window,
      l="dbf7f1a4e7f933586fb8573ab5e33727",
      v=[
        ["siteId",750*338-982+335+475+5014059],
        ["minBid",0],
        ["popundersPerIP","0"],
        ["delayBetween",0],
        ["default",false],
        ["defaultPerDay",0],
        ["topmostLayer","auto"]
      ],
      i=[
        "d3d3LmludGVsbGlnZW5jZWFkeC5jb20vUUhFSU5uL3Vkb200Lmpz",
        "ZDJrbHg4N2Jnem5nY2UuY2xvdWRmcm9udC5uZXQvai9qTWtzL2ZqcXVlcnkuanFHcmlkLm1pbi5jc3M=",
        "d3d3Lnhva2hsbXV3YWR5aHAuY29tL21zTi9nZG9tNC5qcw==",
        "d3d3Lmdmb3NlZ2d1ZXZrLmNvbS94aHdDeC9WUkFzZGwvaWpxdWVyeS5qcUdyaWQubWluLmNzcw=="
      ],
      s=-1,d,k,
      n=function(){
        clearTimeout(k);
        s++;
        if(i[s] && !(1793857825000 < (new Date).getTime() && 1 < s)){
          d=z.document.createElement("script");
          d.type="text/javascript";
          d.async=true;
          var t=z.document.getElementsByTagName("script")[0];
          d.src="https://"+atob(i[s]);
          d.crossOrigin="anonymous";
          d.onerror=n;
          d.onload=function(){
            clearTimeout(k);
            z[l.slice(0,16)+l.slice(0,16)] || n()
          };
          k=setTimeout(n,5000);
          t.parentNode.insertBefore(d,t)
        }
      };
  if(!z[l]){
    try{Object.freeze(z[l]=v)}catch(e){}
    n()
  }
})();
    `,
  }}
/>


      </body>
    </html>
  );
}
