import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Hot Trending Porn Videos | Trendzlib",
  description:
    "Watch trending hot porn videos on Trendzlib. Fast, free, updated daily. All your favorite videos in one place.",
  openGraph: {
    title: "Trendzlib",
    description: "Watch trending hot porn videos on Trendzlib",
    url: "https://trendzlib.com",
    siteName: "Trendzlib",
    images: [
      {
        url: "https://trendzlib.com/favicon.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main style={{ minHeight: "80vh" }}>{children}</main>

        {/* Footer */}
        <Footer />

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
