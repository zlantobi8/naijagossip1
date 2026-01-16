import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationPrompt from "./components/NotificationPrompt";
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
    <html lang="es">
      <body style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main style={{ minHeight: "80vh" }}>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Notification Prompt Component */}
        <NotificationPrompt />

        {/* DELAYED Push SDK with proper loading */}
        <Script
          id="push-sdk-loader"
          strategy="afterInteractive"
        >
          {`
            (function() {
              let sdkLoaded = false;
              let sdkReady = false;
              
              // Don't load if already handled
              if (sessionStorage.getItem('push_subscribed') === 'true' || 
                  sessionStorage.getItem('push_dismissed') === 'true') {
                return;
              }

              function loadRollerAdsSDK() {
                if (sdkLoaded) return;
                sdkLoaded = true;

                console.log('🔄 Starting RollerAds SDK load...');

                const url = new URL(window.location.href);
                const clickID = url.searchParams.get("click_id");
                const sourceID = url.searchParams.get("source_id");

                const s = document.createElement("script");
                s.dataset.cfasync = "false";
                s.src = "https://push-sdk.com/f/sdk.js?z=2426942";
                
                // Handle script load errors
                s.onerror = function() {
                  console.error('❌ Failed to load RollerAds SDK');
                  sdkReady = false;
                  window.rollerads_sdk_failed = true;
                };
                
                s.onload = function(opts) {
                  try {
                    opts.zoneID = 2426942;
                    opts.extClickID = clickID;
                    opts.subID1 = sourceID;
                    
                    // Handle subscription events
                    opts.actions.onPermissionGranted = function() {
                      console.log('✅ Push notification permission granted!');
                      sessionStorage.setItem('push_subscribed', 'true');
                      
                      // Track conversion
                      if (typeof gtag !== 'undefined') {
                        gtag('event', 'push_subscribed', {
                          event_category: 'engagement',
                          event_label: 'rollerads_mexico'
                        });
                      }
                    };
                    
                    opts.actions.onPermissionDenied = function() {
                      console.log('❌ Push notification permission denied');
                      sessionStorage.setItem('push_denied', 'true');
                    };
                    
                    opts.actions.onAlreadySubscribed = function() {
                      console.log('ℹ️ User is already subscribed');
                      sessionStorage.setItem('push_subscribed', 'true');
                    };
                    
                    opts.actions.onError = function(error) {
                      console.error('❌ Push notification error:', error);
                    };

                    // Make SDK globally available
                    window.rollerads_push_sdk = opts;
                    window.rollerads_push = window.rollerads_push || [];
                    
                    // Signal that SDK is ready
                    sdkReady = true;
                    window.rollerads_sdk_ready = true;
                    
                    // Dispatch event for components waiting on SDK
                    window.dispatchEvent(new Event('rollerads_ready'));
                    
                    console.log('✅ RollerAds SDK loaded and ready!');
                  } catch (error) {
                    console.error('❌ Error initializing RollerAds:', error);
                    window.rollerads_sdk_failed = true;
                  }
                };
                
                document.head.appendChild(s);
              }

              // TRIGGER 1: On scroll (200px)
              let scrolled = false;
              window.addEventListener('scroll', function() {
                if (!scrolled && window.scrollY > 200) {
                  scrolled = true;
                  loadRollerAdsSDK();
                }
              }, { passive: true });

              // TRIGGER 2: On any click/tap
              document.addEventListener('click', function() {
                loadRollerAdsSDK();
              }, { once: true });

              // TRIGGER 3: Fallback after 8 seconds
              setTimeout(function() {
                if (!sdkLoaded) {
                  loadRollerAdsSDK();
                }
              }, 8000);

            })();
          `}
        </Script>
      </body>
    </html>
  );
}