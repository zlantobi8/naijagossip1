// app/components/Navbar2.js - FINANCE FOCUSED NAVIGATION

'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container nav-container">
        <div className="responsive-mobile-menu">
          {/* Logo */}
          <Link href="/" className="logo d-lg-none d-block">
            <div className="div22">
              <Image src="/assets/img/naija.png" alt="Trendzlib" width={162} height={46} />
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="menu toggle-btn d-block d-lg-none"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <span className="icon-left"></span>
            <span className="icon-right"></span>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="nextpage_main_menu">
          <ul className="navbar-nav menu-open">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#make-money">Make Money</Link></li>
            <li><Link href="/#invest">Invest Smart</Link></li>
            <li><Link href="/#hustle">Side Hustles</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* CTA Button (Desktop Only) */}
        <div className="d-none d-lg-block">
          <Link href="/#guides" className="btn btn-success rounded-pill px-4 py-2" style={{ fontWeight: '600' }}>
            📚 Start Learning
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .custom-navbar {
          background-color: #1a1a2e;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .div22 {
          background-color: #22c55e;
          width: 165px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
        }

        .navbar-nav li a {
          color: #d1d5db !important;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 0.5rem 1rem;
        }

        .navbar-nav li a:hover {
          color: #22c55e !important;
        }

        @media (max-width: 768px) {
          .custom-navbar {
            background-color: #1a1a2e;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
            z-index: 999;
            position: relative;
          }

          .navbar-collapse.show {
            background-color: #1a1a2e;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
          }

          .navbar-nav li {
            margin-bottom: 0.5rem;
          }

          .navbar-nav li a {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
          }

          .navbar-nav li a:hover {
            background-color: rgba(34, 197, 94, 0.1);
          }
        }
      `}</style>
    </nav>
  );
}