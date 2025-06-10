// app/layout.js

import Script from 'next/script';
import Footer from './Footer';
import './globals.css';

export const metadata = {
  title: 'Naija Gossip',
  description: 'Latest news and gossip from Nigeria',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zxx">
      <head>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        {/* Add meta tags here or use Next.js Metadata API */}
        <link rel="icon" href="/assets/img/lll-removebg-preview.png" sizes="50x50" type="image/png" />
        <link rel="stylesheet" href="/assets/css/vendor.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />

      </head>
      <body>

        {children}
        {/* Place global components like navbar, footer here if you want */}

      </body>
    </html>
  );
}
