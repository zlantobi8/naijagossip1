'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

export default function Navbar2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container nav-container">
        <div className="responsive-mobile-menu">
          <div className="logo d-lg-none d-block">
            <div className="div22">
              <Image src="/assets/img/naija.png" alt="logo" width={162} height={46} />
            </div>

          </div>

          <button
            className="menu toggle-btn d-block d-lg-none"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <span className="icon-left"></span>
            <span className="icon-right"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="nextpage_main_menu">
          <ul className="navbar-nav menu-open">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/category/politics">Politics</Link></li>
            <li><Link href="/category/sport">Sport</Link></li>
            <li><Link href="/category/education">Education</Link></li>
            <li><Link href="/category/technology">Technology</Link></li>
            <li><Link href="/category/entertainment">Entertainment</Link></li>
          </ul>
        </div>
      </div>
      <style jsx>{`
  .custom-navbar {
    background-color: #0866ff;
    transition: all 0.3s ease;
  }
.div22{
    background-color: #10284f;
    width:165px;
    height:50px;
    border-radius:10px;
}
  @media (max-width: 768px) {
    .custom-navbar {
      background-color: #0866ff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* subtle shadow */
      z-index: 999;
      position: relative;
    }
  }
`}</style>

    </nav>

  );
}