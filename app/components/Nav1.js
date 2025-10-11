'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSeeMore = (title) => {
    const slug = title.toLowerCase();
    router.push(`/category/${slug}`);
  };

  return (
    <>
      <div className="navbar-area">
        <nav className="navbar navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <div className="logo d-lg-none d-block">
                <Link href="/">
                  <div className="div23">
                    <Image className='foot2' src="/assets/img/naija.png" alt="logo" width={100} height={58} />
                  </div>
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
                  <a onClick={() => handleSeeMore('entertainment')} style={{ cursor: 'pointer' }}>Entertainment</a>
                </li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('sport')} style={{ cursor: 'pointer' }}>Sport</a>
                </li>
                {/* Keep these for legal pages */}
                <li className="current-menu-item d-none d-lg-block">
                  <Link href="/about">About</Link>
                </li>
                <li className="current-menu-item d-none d-lg-block">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <style jsx>{`
          .div23{
            background-color: #10284f;
            width:155px;
            height:40px;
            border-radius:10px;
          }
        `}</style>
      </div>
    </>
  );
};

export default NavBar;