import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = ({ handleSeeMore }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (mobileMenuOpen || searchOpen) {
      body.classList.add('body-overlay-active');
    } else {
      body.classList.remove('body-overlay-active');
    }
  }, [mobileMenuOpen, searchOpen]);

  return (
    <>
      {/* Search popup */}
      {searchOpen && (
        <div className="td-search-popup">
          <div className="search-form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search....." />
            </div>
            <button type="button" className="submit-btn" onClick={() => alert('Searching...')}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(mobileMenuOpen || searchOpen) && (
        <div
          className="body-overlay"
          onClick={() => {
            setMobileMenuOpen(false);
            setSearchOpen(false);
          }}
        ></div>
      )}

      <div className="navbar-area">
        {/* Navbar */}
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

            <div className="nav-right-part nav-right-part-mobile">
              <a className="search header-search" onClick={() => setSearchOpen(true)}>
                <i className="fa fa-search"></i>
              </a>
            </div>

            <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="nextpage_main_menu">
              <ul className="navbar-nav menu-open">
                <li className="current-menu-item"><Link href="/">Home</Link></li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('politics')} style={{ cursor: 'pointer' }}>Politics</a>
                </li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('sport')} style={{ cursor: 'pointer' }}>Sport</a>
                </li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('education')} style={{ cursor: 'pointer' }}>Education</a>
                </li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('technology')} style={{ cursor: 'pointer' }}>Technology</a>
                </li>
                <li className="current-menu-item">
                  <a onClick={() => handleSeeMore('health')} style={{ cursor: 'pointer' }}>Health</a>
                </li>
              </ul>
            </div>

            <div className="nav-right-part nav-right-part-desktop">
              <div className="menu-search-inner">
                <input type="text" placeholder="Search For" />
                <button type="button" className="submit-btn" onClick={() => alert('Searching...')}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
