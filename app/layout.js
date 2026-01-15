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
        <script
          src="https://kit.fontawesome.com/36253d02c7.js"
          crossOrigin="anonymous"
        ></script>
      <meta name="juicyads-site-verification" content="0bb974242fe866cf3a887e7b0d5f9c65"></meta>
      <meta name="6a97888e-site-verification" content="820479814b0b307565ef6fd233fbf733"></meta>
<script src="https://richinfo.co/richpartners/pops/js/richads-pu-ob.js" data-pubid="991655" data-siteid="385068" async data-cfasync="false"></script>
      </head>

      <body>
        <StructuredData />

        {children}

  {/* Push SDK script */}
        <Script
          id="push-sdk"
          strategy="afterInteractive"
        >
          {`
            (function() {
              const url = new URL(window.location.href);
              const clickID = url.searchParams.get("click_id");
              const sourceID = url.searchParams.get("source_id");

              const s = document.createElement("script");
              s.dataset.cfasync = "false";
              s.src = "https://push-sdk.com/f/sdk.js?z=2426942";
              s.onload = (opts) => {
                opts.zoneID = 2426942;
                opts.extClickID = clickID;
                opts.subID1 = sourceID;
                opts.actions.onPermissionGranted = () => {};
                opts.actions.onPermissionDenied = () => {};
                opts.actions.onAlreadySubscribed = () => {};
                opts.actions.onError = () => {};
              };
              document.head.appendChild(s);
            })();
          `}
        </Script>


      </body>
    </html>
  );
}
