'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div id="container-4de593a4c6840ec4df6914b2537aff00"></div>

      <div id="scrol13" className="footer-area bg-black pt-5">
        <div className="container">

          {/* Centered Logo using Bootstrap */}
          <div className="text-center mb-4">
            <Image
              src="/assets/img/naija.png"
              width={400}
              height={50}
              alt="logo"
              className="img-fluid"
            />
          </div>

          {/* FOOTER BOTTOM */}
          <div className="footer-bottom text-center">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link href="/about" className="text-white text-decoration-none">About</Link>
              </li>
             
              <li className="list-inline-item">
                <Link href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="list-inline-item">
                <Link href="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
            </ul>

            <p>
              © 2025 <a href="#">Naija Gossip</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
