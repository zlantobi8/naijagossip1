// app/page.js - FINAL VERSION (Entertainment + Sport from Sanity)

import Image from 'next/image';
import Link from 'next/link';
import BannerAd from './components/BannerAd';
import MainPosts from './components/Mainposts';
import Section from './components/Section';
import Footer from './Footer';
import Navbar2 from './components/Navbar2';

const siteTitle = 'Trendzlib - Nigerian Entertainment & Sports News';
const siteDescription = 'Your #1 source for Nigerian celebrity gossip, Nollywood gist, Afrobeats news, BBNaija updates & football stories. Fresh entertainment & sport daily!';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: 'Nigerian celebrity news, entertainment gossip, BBNaija, Davido, Wizkid, Nollywood, Victor Osimhen, Super Eagles, Nigerian football, sports news',
  alternates: { canonical: 'https://www.trendzlib.com.ng' },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.trendzlib.com.ng',
    siteName: 'Trendzlib',
    images: [{ url: 'https://www.trendzlib.com.ng/assets/img/naija.png', width: 200, height: 60, alt: 'Trendzlib - Entertainment & Sport News' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    site: '@trendzlib',
    images: ['https://www.trendzlib.com.ng/assets/img/naija.png'],
  },
};

// 🔥 Fetch entertainment + sports from Sanity
const query = encodeURIComponent(`{
  "entertainmentPost": *[_type == "news" && category == "entertainment"] | order(publishedAt desc)[0...16] {
    _id, title, content, category, image, source, link, publishedAt
  },
  "sportsPost": *[_type == "news" && category == "sports"] | order(publishedAt desc)[0...16] {
    _id, title, content, category, image, source, link, publishedAt
  }
}`);

async function fetchData() {
  const res = await fetch(`https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` },
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.result || {};
}

export default async function Home() {
  const categorizedPosts = await fetchData();

  const allEntertainment = categorizedPosts.entertainmentPost || [];
  const allSports = categorizedPosts.sportsPost || [];

  const mainPosts = [
    allEntertainment[0],
    allEntertainment[1],
    allSports[0],
    allEntertainment[2],
    allSports[1],
  ].filter(Boolean);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <div className="navbar-area">
        {/* Topbar */}
        <div className="topbar-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-7 align-self-center">
                <div className="topbar-menu text-md-left text-center">
                  <ul className="align-self-center">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/category/sport">Sport</Link></li>
                    <li><Link href="/category/entertainment">Entertainment</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 mt-2 mt-md-0 text-md-right text-center">
                <div className="topbar-social">
                  <div className="topbar-date d-none d-lg-inline-block">
                    <i className="fa fa-calendar"></i> <span>{currentDate}</span>
                  </div>
                  <ul className="social-area social-area-2">
                    <li>
                      <a className="facebook-icon" href="https://www.facebook.com/profile.php?id=61578802011674" rel="noopener noreferrer" target="_blank">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="adbar-area bg-black d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-5 align-self-center">
                <div className="logo text-md-left text-center">
                  <Image src="/assets/img/naija.png" alt="Trendzlib" width={200} height={60} />
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 text-md-right text-center">
                <p style={{color: 'white', marginTop: '20px', fontSize: '18px'}}>🔥 Entertainment & Sport News Daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <Navbar2 />

        {/* Banner */}
        <div className="banner-area banner-inner-1 bg-black" id="banner">
          <BannerAd slicepost={mainPosts} />
          <MainPosts posts={mainPosts} />
        </div>

        {/* ✅ Sections */}
        <Section title="Entertainment" id="entertainment" posts={allEntertainment} />
        <Section title="Sport" id="sport" posts={allSports} />

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <div className="back-to-top">
          <span className="back-top"><i className="fa fa-angle-up" /></span>
        </div>
      </div>
    </>
  );
}
