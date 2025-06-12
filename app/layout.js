import Script from 'next/script';
import Footer from './Footer';
import './globals.css';
import LoadAdSense from './components/LoadAdsense';

export const metadata = {
  title: 'Naija Gossip',
  description: 'Latest news and gossip from Nigeria',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zxx">
      <head>
<meta name="google-site-verification" content="jgfedbwYYJwFsiiWj38-xP3bU4vmeXLPTqmAY8G49yw" />

        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />

        {/* ✅ Google AdSense Script */}
      

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link rel="icon" href="/assets/img/lll-removebg-preview.png" sizes="50x50" type="image/png" />
        <link rel="stylesheet" href="/assets/css/vendor.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body>
        <LoadAdSense/>
        {children}
        {/* You can add <Footer /> here if it should appear on all pages */}
      </body>
    </html>
  );
}
