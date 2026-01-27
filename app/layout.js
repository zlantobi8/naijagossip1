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
        <meta
          name="juicyads-site-verification"
          content="0bb974242fe866cf3a887e7b0d5f9c65"
        />
        <meta
          name="6a97888e-site-verification"
          content="820479814b0b307565ef6fd233fbf733"
        />
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>

      <body>
        <StructuredData />
        {children}

        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/36253d02c7.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

   <Script
  id="intelligence-ads"
  strategy="afterInteractive"
  data-cfasync="false"
  dangerouslySetInnerHTML={{
    __html: `
/*<![CDATA[/* */
(function(){
  var a=window,
  q="dbf7f1a4e7f933586fb8573ab5e33727",
  m=[
    ["siteId",854-710-310+5267553],
    ["minBid",0],
    ["popundersPerIP","0"],
    ["delayBetween",0],
    ["default",false],
    ["defaultPerDay",0],
    ["topmostLayer","auto"]
  ],
  t=[
    "d3d3LmludGVsbGlnZW5jZWFkeC5jb20vT2RGYVZ6L3plcG9jaC5taW4uanM=",
    "ZDJrbHg4N2Jnem5nY2UuY2xvdWRmcm9udC5uZXQvc2xOWlZxL2lqRy9xbmctcHJldHR5anNvbi5taW4uY3Nz"
  ],
  u=-1,d,p,
  k=function(){
    clearTimeout(p);
    u++;
    if(t[u] && !(1795431294000 < (new Date).getTime() && 1 < u)){
      d=a.document.createElement("script");
      d.type="text/javascript";
      d.async=true;
      var r=a.document.getElementsByTagName("script")[0];
      d.src="https://"+atob(t[u]);
      d.crossOrigin="anonymous";
      d.onerror=k;
      d.onload=function(){
        clearTimeout(p);
        a[q.slice(0,16)+q.slice(0,16)] || k();
      };
      p=setTimeout(k,5000);
      r.parentNode.insertBefore(d,r);
    }
  };
  if(!a[q]){
    try{Object.freeze(a[q]=m)}catch(e){}
    k();
  }
})();
/*]]>/* */
    `,
  }}
/>


      
      </body>
    </html>
  );
}
