"use client";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router

import { useEffect, useState } from "react";
import Image from 'next/image';
import Script from 'next/script';
import Section from "./components/Section"
import MainPosts from "./components/Mainposts";
import axios from "axios";
import BannerAd from "./components/BannerAd";
import Link from "next/link";
import Footer from "./Footer";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSeeMore = (title) => {
    const slug = title.toLowerCase(); // optional slug formatting
    router.push(`/category/${slug}`);
  };



  const [mainPosts, setMainPosts] = useState([]);
  const [categorizedPosts, setCategorizedPosts] = useState({
    sportsPost: [],
    educationPost: [],
    politicsPost: [],
    technologyPost: [],
    healthPost: [],
    celebrityPost: [],
  });

  const query = encodeURIComponent(`{
    "sportsPost": *[_type == "sportsPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "educationPost": *[_type == "educationPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "politicsPost": *[_type == "politicsPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "technologyPost": *[_type == "technologyPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "healthPost": *[_type == "healthPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "celebrityPost": *[_type == "celebrityPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    },
    "mainPost": *[_type == "mainPost"] | order(date desc) {
      _id, title, "image": image.asset->url, category, categoryClass, description, author, readingTime, date
    }
  }`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_AUTH,
          }
        });

        const result = response.data.result || {};

        const {
          mainPost = [],
          sportsPost = [],
          educationPost = [],
          politicsPost = [],
          technologyPost = [],
          healthPost = [],
          celebrityPost = [],
        } = result;


        setCategorizedPosts({
          sportsPost,
          educationPost,
          politicsPost,
          technologyPost,
          healthPost,
          celebrityPost,
        });

        // Get latest posts from categories
        const getLatest = (posts) =>
          posts?.length ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;

        const mainSet = [
          getLatest(politicsPost),
          getLatest(sportsPost),
          getLatest(technologyPost),
          getLatest(celebrityPost)
        ].filter(Boolean);

        setMainPosts(mainSet);

      } catch (err) {
        console.error('Error fetching Sanity data:', err);
      }
    };

    fetchData();
  },);


  useEffect(() => {
    if (mainPosts == "") {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }, [mainPosts]);

  return (
    <>
      {loading && (
        <div className="preloader" id="preloader">
          <div className="preloader-inner">
            <div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* search popup start */}


          {/* 
          er start */}
          <div className="navbar-area">
            {/* topbar start */}
            <div className="topbar-area">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-7 align-self-center">
                    <div className="topbar-menu text-md-left text-center">
                      <ul className="align-self-center">
                        <li><a href="#">Author</a></li>
                        <li><a href="#">Advertisment</a></li>
                        <li><a href="#">Member</a></li>
                        <li><a href="#">Sitemap</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-5 mt-2 mt-md-0 text-md-right text-center">
                    <div className="topbar-social">
                      <div className="topbar-date d-none d-lg-inline-block" id="lateDate">
                        <i className="fa fa-calendar"></i>
                      </div>
                      <ul className="social-area social-area-2">
                        <li><a className="facebook-icon" href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a className="twitter-icon" href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a className="youtube-icon" href="#"><i className="fa fa-youtube-play"></i></a></li>
                        <li><a className="instagram-icon" href="#"><i className="fa fa-instagram"></i></a></li>
                        <li><a className="google-icon" href="#"><i className="fa fa-google-plus"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* adbar start */}
            <div className="adbar-area bg-black d-none d-lg-block">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-5 align-self-center">
                    <div className="logo text-md-left text-center">
                      <Link className="main-logo" href="/">
                        <Image
                          src="/assets/img/naija.png"
                          alt="logo"
                          width={200}       // Adjust to your image's actual width
                          height={50}       // Adjust to your image's actual height
                        />

                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7 text-md-right text-center">
                    {/* Add any content here if needed */}
                  </div>
                </div>
              </div>
            </div>

            {/* navbar start */}
            <nav className="navbar navbar-expand-lg">
              <div className="container nav-container">
                <div className="responsive-mobile-menu">
                  <div className="logo d-lg-none d-block">
                    <Link href="/">
                      <Image src="/assets/img/naija.png" alt="logo" width={100} height={50} />
                    </Link>
                  </div>
                  <button
                    className="menu toggle-btn d-block d-lg-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    <span className="icon-left"></span>
                    <span className="icon-right"></span>
                  </button>
                </div>


                <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="nextpage_main_menu">
                  <ul className="navbar-nav menu-open">
                    <li className="current-menu-item"><Link href="/">Home</Link></li>
                    <li className="current-menu-item">
                      <Link href="/category/politics">Politics</Link>
                    </li>
                    <li className="current-menu-item">
                      <Link href="/category/sport">Sport</Link>
                    </li>
                    <li className="current-menu-item">
                      <Link href="/category/education">Education</Link>
                    </li>
                    <li className="current-menu-item">
                      <Link href="/category/technology">Technology</Link>
                    </li>
                    <li className="current-menu-item">
                      <Link href="/category/health">Health</Link>
                    </li>
                  </ul>
                </div>


              </div>
            </nav>

            <div className="banner-area banner-inner-1 bg-black" id="banner">

              <BannerAd slicepost={mainPosts} />
              <MainPosts posts={mainPosts} />
            </div>




            {/* Sections */}
            <Section title="Politics" id="politics" rowId="politics-posts-row" seeMoreId="see-more-politics" posts={categorizedPosts.politicsPost} />
            <Section title="Sport" id="sport" rowId="latest-posts-row" seeMoreId="see-more-sport" posts={categorizedPosts.sportsPost} />
            <Section title="Education" id="education" rowId="education-posts-row" seeMoreId="see-more-education" posts={categorizedPosts.educationPost} />
            <Section title="Technology" id="technology" rowId="Technology-posts-row" seeMoreId="see-more-technology" posts={categorizedPosts.technologyPost} />
            <Section title="Health" id="health" rowId="health-posts-row" seeMoreId="see-more-health" posts={categorizedPosts.healthPost} />

            <div id="container-4de593a4c6840ec4df6914b2537aff00"></div>

            {/* Footer */}


            {/* Back to top */}
            <div className="back-to-top">
              <span className="back-top"><i className="fa fa-angle-up" /></span>
            </div>

            {/* Scripts */}
          
     
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
