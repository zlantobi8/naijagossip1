'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
    </nav>
  );
}
