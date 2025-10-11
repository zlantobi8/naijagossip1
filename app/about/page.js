import Nav1 from "@/app/components/Nav1";
import Footer from "@/app/Footer";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "About Us | Trendzlib",
  description: "Learn more about Trendzlib - Nigeria's leading entertainment and sports news platform.",
  alternates: {
    canonical: "https://www.trendzlib.com.ng/about",
  }
};

export default function About() {
  return (
    <div className="bg-light text-dark">
      <div className="navbar-area" style={{ background: '#10284f' }}>
        <Nav1 />
      </div>

      <div className="container py-5" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
        <h1 className="text-center mb-4">About Us</h1>

        <p><strong>Trendzlib</strong> is Nigeria&apos;s premier digital entertainment and sports news platform.</p>
        <p>We deliver the hottest celebrity gossip, Nollywood updates, Afrobeats news, BBNaija exclusives, and breaking football stories to millions of Nigerians daily.</p>

        <h4 className="mt-5">What We Cover</h4>
        <p><strong>Entertainment:</strong> From Davido&apos;s latest moves to BBNaija drama, we bring you exclusive celebrity news, relationship gossip, fashion trends, and everything happening in Nigerian entertainment.</p>
        
        <p><strong>Sports:</strong> Follow Victor Osimhen&apos;s transfer saga, Super Eagles updates, Premier League action featuring Nigerian stars, and expert football analysis.</p>

        <h4 className="mt-5">Our Mission</h4>
        <p>We keep Nigerians informed and entertained with accurate, timely, and engaging content. Whether it's breaking celebrity news or the latest football transfer rumors, Trendzlib is your go-to source.</p>

        <h4 className="mt-5">Why Choose Trendzlib?</h4>
        <ul>
          <li>✅ Fresh content published daily</li>
          <li>✅ Accurate and verified information</li>
          <li>✅ Breaking news delivered fast</li>
          <li>✅ Entertainment and sports in one place</li>
          <li>✅ Mobile-friendly for reading on the go</li>
        </ul>

        <h4 className="mt-5">Get in Touch</h4>
        <p>Have a story tip, feedback, or partnership inquiry? We'd love to hear from you.</p>

        <p><strong>Email:</strong> <Link href="mailto:newsroom@trendzlib.com">newsroom@trendzlib.com</Link></p>

        <p><strong>Address:</strong><br />
          Lagos State, Nigeria<br />
          Phone: <Link href="tel:+2347061043812">+2347061043812</Link></p>

        <p><strong>Connect With Us:</strong><br />
          Twitter: <Link href="https://twitter.com/trendzlib" target="_blank" rel="noopener noreferrer">@trendzlib</Link> | <Link href="https://twitter.com/trendzlibceo" target="_blank" rel="noopener noreferrer">@trendzlibceo</Link><br />
          Facebook: <Link href="https://www.facebook.com/officialtrendzlib" target="_blank" rel="noopener noreferrer">facebook.com/officialtrendzlib</Link><br />
          WhatsApp: <Link href="https://wa.me/2347061043812" target="_blank" rel="noopener noreferrer">+2347061043812</Link></p>
      </div>

      <Footer />
    </div>
  );
}