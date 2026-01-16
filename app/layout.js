import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Hot Trending Videos",
  description:
    "Watch trending hot  videos on Trendzlib. Fast, free, updated daily. All your favorite videos in one place.",
  openGraph: {
    title: "Trendzlib",
    description: "Watch trending hot videos on Trendzlib",
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
      <head>
        {/* Any extra head content can go here */}
      </head>
      <body>
        <main>{children}</main>
        {/* Optional footer can go here */}
      </body>
    </html>
  );
}
