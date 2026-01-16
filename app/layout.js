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

        {/* Push SDK Config */}
        <Script
          id="push-sdk-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.PushSDKConfig = {
                zoneID: 2426942,
                extClickID: new URL(window.location.href).searchParams.get("click_id"),
                subID1: new URL(window.location.href).searchParams.get("source_id"),
                actions: {
                  onPermissionGranted: () => {},
                  onPermissionDenied: () => {},
                  onAlreadySubscribed: () => {},
                  onError: () => {},
                },
              };
            `,
          }}
        />

        {/* Push SDK Script */}
        <Script
          src="https://push-sdk.com/f/sdk.js?z=2426942"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
