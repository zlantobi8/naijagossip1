// app/page.js

import Image from 'next/image';
import BannerAd from './components/BannerAd';
import MainPosts from './components/Mainposts';
import Section from './components/Section';
import Footer from './Footer';
import Navbar2 from './components/Navbar2';
import Head from 'next/head';
const siteTitle = 'Trendzlib - Latest Nigerian News, Gossip & Entertainment';
const siteDescription = 'Stay updated with the hottest Nigerian gossip, celebrity news, politics, sports, education and entertainment stories. Your #1 source for Naija gist!';

// ...existing code...
export const metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: 'Nigeria news, sports, politics, entertainment, education, technology, celebrity, Naija gist, breaking news',
  alternates: {
    canonical: 'https://www.trendzlib.com.ng'
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://www.trendzlib.com.ng',
    siteName: siteTitle,
    images: [
      {
        url: 'https://www.trendzlib.com.ng/assets/img/naija.png', // Absolute URL
        width: 200,
        height: 60,
        alt: 'Trendzlib Nigeria News Logo'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    site: '@trendzlib',
    images: ['https://www.trendzlib.com.ng/assets/img/naija.png'] // Absolute URL
  },
  robots: 'index, follow',
  authors: [{ name: 'Trendzlib Team', url: 'https://www.trendzlib.com.ng/about' }],
  viewport: 'width=device-width, initial-scale=1',
};
// ...existing code...

const query = encodeURIComponent(`{
  "sportsPost": *[_type == "sportsPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "educationPost": *[_type == "educationPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "politicsPost": *[_type == "politicsPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "technologyPost": *[_type == "technologyPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "healthPost": *[_type == "healthPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "celebrityPost": *[_type == "celebrityPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  },
  "mainPost": *[_type == "mainPost"] | order(date desc)[0...8] {
    _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
  }
}`);

async function fetchData() {
  const res = await fetch(`https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_AUTH,
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data.result || {};
}

export default async function Home() {
  const categorizedPosts = await fetchData();

  const getLatest = (posts) => posts?.length ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;

  const mainPosts = [
    getLatest(categorizedPosts.politicsPost),
    getLatest(categorizedPosts.sportsPost),
    getLatest(categorizedPosts.technologyPost),
    getLatest(categorizedPosts.celebrityPost),
    getLatest(categorizedPosts.healthPost)
  ].filter(Boolean);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
    
      <div className="navbar-area">

        {/* 🔵 Topbar */}
        <div className="topbar-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-7 align-self-center">
                <div className="topbar-menu text-md-left text-center">
                  <ul className="align-self-center">
                    <li><a href="#">Author</a></li>
                    <li><a href="#">Advertisment</a></li>
                    <li><a href="#">Member</a></li>

                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 mt-2 mt-md-0 text-md-right text-center">
                <div className="topbar-social">
                  <div className="topbar-date d-none d-lg-inline-block" id="lateDate">
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

        {/* 🔵 Logo & AdBar */}
        <div className="adbar-area bg-black d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-5 align-self-center">
                <div className="logo text-md-left text-center">

                  <Image src="/assets/img/naija.png" alt="Trendzlib Nigeria News Logo" width={200} height={60} />

                </div>
              </div>
              <div className="col-xl-6 col-lg-7 text-md-right text-center">
                {/* You can add ad banners or text here if needed */}
              </div>
            </div>
          </div>
        </div>

        {/* 🔵 Navbar */}
        <Navbar2 />

        {/* 🔵 Banner & Main Posts */}
        <div className="banner-area banner-inner-1 bg-black" id="banner">
          <BannerAd slicepost={mainPosts} />
          <MainPosts posts={mainPosts} />
        </div>

        {/* 🔵 Sections */}
        <Section title="Entertainment" id="entertainment" posts={categorizedPosts.healthPost} />
        <Section title="Politics" id="politics" posts={categorizedPosts.politicsPost} />
        <Section title="Sport" id="sport" posts={categorizedPosts.sportsPost} />
        <Section title="Education" id="education" posts={categorizedPosts.educationPost} />
        <Section title="Metro" id="Metro" posts={categorizedPosts.technologyPost} />


        {/* 🔵 Footer */}
        <Footer />

        {/* 🔵 Back to Top */}
        <div className="back-to-top">
          <span className="back-top"><i className="fa fa-angle-up" /></span>
        </div>

      </div>
    </>
  );
}