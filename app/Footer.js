'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div id="container-4de593a4c6840ec4df6914b2537aff00"></div>

      <div id="scrol13" className="footer-area bg-black pt-5 text-white">
        <div className="container">

          {/* Centered Logo */}
          <div className="mb-4 d-flex justify-content-center align-items-center">
            <Image
              className="foot1"
              src="/assets/img/naija.png"
              alt="Trendzlib Nigeria News Logo"
              width={260}
              height={70}
              priority
            />
          </div>

          {/* Footer Links */}
          <div className="footer-bottom text-center">
            <ul className="list-inline mb-3">
              <li className="list-inline-item mx-2">
                <Link href="/about" className="text-white text-decoration-none">About</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link href="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
            </ul>

            <p className="m-0">
              © {new Date().getFullYear()} <a href="#" className="text-white text-decoration-none">Trendzlib</a>
            </p>
          </div>
        </div>

        {/* Scoped Styles */}
        <style jsx>{`
          .footer-area {
            padding-bottom: 1.5rem;
          }

          .foot1 {
            width: 260px;
            height: 70px;
            object-fit: contain;
          }

          @media (max-width: 768px) {
            .foot1 {
              width: 200px;
              height: 55px;
            }
          }

          .list-inline-item a:hover {
            color: #ffcc00;
          }
        `}</style>
      </div>
    </>
  );
};

export default Footer;
