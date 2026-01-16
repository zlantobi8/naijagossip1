import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Choose one of these:
import NotificationPrompt from "./components/NotificationPrompt"; // Bottom-right slide-in
// import ModalNotificationPrompt from "./components/ModalNotificationPrompt"; // Full-screen modal
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

        {/* Notification Prompt Component */}
        <NotificationPrompt />

        {/* Push SDK script - UPDATED */}
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
              s.onload = function(opts) {
                opts.zoneID = 2426942;
                opts.extClickID = clickID;
                opts.subID1 = sourceID;
                
                // Handle subscription events
                opts.actions.onPermissionGranted = function() {
                  console.log('✅ Push notification permission granted!');
                  // You can track this event or show a success message
                };
                
                opts.actions.onPermissionDenied = function() {
                  console.log('❌ Push notification permission denied');
                  // You can track this event
                };
                
                opts.actions.onAlreadySubscribed = function() {
                  console.log('ℹ️ User is already subscribed');
                  // User already subscribed, no need to show prompt again
                };
                
                opts.actions.onError = function(error) {
                  console.error('❌ Push notification error:', error);
                };

                // Make SDK globally available for components
                window.rollerads_push_sdk = opts;
              };
              document.head.appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}