import "./globals.css";
import Header from "./components/Header";
import Script from "next/script";
import Footer from "./components/Footer";

export const metadata = {
  title: "Hot Trending porn Videos",
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
      <body>
        {/* Header will be inside pages if you want, but you can add here globally too */}
        <Header />
        <main>{children}</main>
<Footer/>
        {/* Push SDK Script */}
        <Script
          id="push-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const url = new URL(window.location.href);
                const clickID = url.searchParams.get("click_id");
                const sourceID = url.searchParams.get("source_id");

                const s = document.createElement("script");
                s.dataset.cfasync = "false";
                s.src = "https://push-sdk.com/f/sdk.js?z=2426942";
                s.onload = function() {
                  if (window.PushSDK) {
                    window.PushSDK.zoneID = 2426942;
                    window.PushSDK.extClickID = clickID;
                    window.PushSDK.subID1 = sourceID;
                    window.PushSDK.actions = {
                      onPermissionGranted: function() {},
                      onPermissionDenied: function() {},
                      onAlreadySubscribed: function() {},
                      onError: function() {}
                    };
                  }
                };
                document.head.appendChild(s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
