

import Nav1 from "@/app/components/Nav1";
import Footer from "@/app/Footer";
import React from "react";

// ✅ Export metadata BEFORE the component
export const metadata = {
  title: "About Us | Trendzlib",
  description: "Learn more about  Trendzlib, our mission, journalism, and values.",
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

        <p><strong>Trendzlib</strong> is a fully digital media platform powered by  Trendzlib Media.</p>
        <p>We are committed to delivering authentic, timely, and unbiased news to the Nigerian public and global readers. Our mission is to empower our audience with the facts—nothing more, nothing less.</p>

        <h4 className="mt-5">Our Editorial Values</h4>
        <p>At Trendzlib, we prioritize truth, accuracy, and clarity in our journalism. We believe that credible reporting builds trust—and trust is the foundation of our relationship with you.</p>
        <p>We aim to inform, not influence. Rather than pushing opinions, our focus is to present facts and allow our readers to form their own perspectives. Our team works diligently to explain the full context of every story.</p>

        <h4 className="mt-5">Independence & Accountability</h4>
        <p>We operate independently of any political or commercial influence. Editorial decisions are based solely on public interest and newsworthiness.</p>
        <p>We also hold ourselves accountable. Mistakes, though rare, are corrected transparently and promptly. Our readers deserve nothing less.</p>

        <h4 className="mt-5">Social Responsibility</h4>
        <p>Beyond reporting, we are committed to making a positive impact. Our newsroom fosters diversity, inclusiveness, and integrity. We treat all individuals—whether staff, sources, or audience—with dignity and respect.</p>

        <h4 className="mt-5">Get in Touch</h4>
        <p>Have questions, feedback, or story tips? We’d love to hear from you.</p>

        <p><strong>Email:</strong> <a href="mailto:newsroom@Trendzlib.com">newsroom@Trendzlib.com</a></p>

        <p><strong>Address:</strong><br />
          Lagos State, Nigeria<br />
          Phone: <a href="tel:+2348101234567">+2347061043812</a></p>

        <p><strong>Connect With Us:</strong><br />
          Twitter: <a href="https://twitter.com/Trendzlib" target="_blank">@Trendzlib</a> | <a href="https://twitter.com/Trendzlibceo" target="_blank">@Trendzlibceo</a><br />
          Facebook: <a href="https://www.facebook.com/officialTrendzlib" target="_blank">facebook.com/officialTrendzlib</a><br />
          WhatsApp: <a href="https://wa.me/2347061043812" target="_blank">+2347061043812</a></p>
      </div>

      <Footer />
    </div>
  );
}
