'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from './components/Logo';

const Footer = () => {
  return (
    <>
      <div id="container-4de593a4c6840ec4df6914b2537aff00"></div>

      <div id="scrol13" className="footer-area bg-black pt-5">
        <div className="container">

          {/* Centered Logo using Bootstrap */}
          <div
            className="mb-4"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Image className='foot1'
              src={'/assets/img/naija.png'}
              alt={'Main post image'}
              width={260}
              height={70}
              priority
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
              © 2025 <a href="#">Trendzlib</a>
            </p>
          </div>
        </div>
        <style jsx>{`
      @media (max-width: 768px) {
    .foot1{
    width:250;
    height:60
    }
  }
`}</style>
      </div>
    </>
  );
};

export default Footer;
