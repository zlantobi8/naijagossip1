'use client';

import React from 'react';

const Footer = () => {
  return (
    <>
      <div id="container-4de593a4c6840ec4df6914b2537aff00"></div>

      <div id="scrol13" className="footer-area bg-black pd-top-95">
        <div className="container">
          <div className="row justify-content-between">
            {/* ABOUT US */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h5 className="widget-title">ABOUT US</h5>
                <div className="widget_about">
                  <p>
                    <strong>NaijaGossip</strong> is your go-to source for the latest trending news,
                    entertainment stories, celebrity gist, and real-time updates from across Nigeria and
                    beyond. We’re dedicated to keeping you informed and entertained with fresh,
                    reliable, and engaging content—served hot, just the way you like it.
                  </p>
                  <ul className="social-area social-area-2 mt-4">
                    <li><a className="facebook-icon" href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a className="twitter-icon" href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a className="youtube-icon" href="#"><i className="fa fa-youtube-play"></i></a></li>
                    <li><a className="instagram-icon" href="#"><i className="fa fa-instagram"></i></a></li>
                    <li><a className="google-icon" href="#"><i className="fa fa-google-plus"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget widget_tag_cloud">
                <h5 className="widget-title">TAGS</h5>
                <div className="tagcloud">
                  <a href="#">Updates</a>
                  <a href="#">Leaked news</a>
                  <a href="#">Hit Map</a>
                  <a href="#">Hot News</a>
                  <a href="#">Trending News</a>
                </div>
              </div>
            </div>

            {/* CONTACTS */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h5 className="widget-title">CONTACTS</h5>
                <ul className="contact_info_list">
                  <li><i className="fa fa-map-marker"></i> Nigeria</li>
                  <li><i className="fa fa-phone"></i> +234 9166654979</li>
                  <li><i className="fa fa-envelope-o"></i> Naijagossip444@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="footer-bottom text-center">
            <ul className="widget_nav_menu">
              <li><a href="#">About</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            <p>
              Copyright ©2025 <a href="#">Naija Gossip</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
