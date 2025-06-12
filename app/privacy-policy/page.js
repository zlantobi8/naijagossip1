
import Nav1 from "@/app/components/Nav1";
import Footer from "@/app/Footer";
import Image from "next/image";
import React from "react";
export const metadata = {
  title: "Privacy Policy | Naija Gossip",
  description: "Read about how Naija Gossip collects and uses your data.",
};

export default function Privacy() {
  return (
    <div className="bg-light text-dark">
      {/* Logo (hidden on mobile) */}
      <div className="pt-4 text-center mb-4 d-none d-md-block">
        <Image
          src="/assets/img/naija.png"
          width={400}
          height={50}
          alt="logo"
          className="img-fluid"
        />
      </div>

      {/* Navbar */}
      <div className="navbar-area" style={{ background: '#10284f' }}>
        <Nav1 />
      </div>

      {/* Content */}
      <div className="container py-5" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
        <h1 className="text-center mb-4">Privacy Policy</h1>

        <p>
          At <strong>Naija Gossip</strong>, your privacy is very important to us. This privacy policy outlines the types of information we collect,
          how we use it, and the measures we take to protect it.
        </p>

        <h4 className="mt-5">1. Information We Collect</h4>
        <p>We may collect personal information such as your name, email address, and contact number when you:</p>
        <ul>
          <li>Subscribe to our newsletter</li>
          <li>Contact us via our contact form or email</li>
          <li>Comment or interact with our content</li>
        </ul>

        <h4 className="mt-5">2. How We Use Your Information</h4>
        <p>
          We use your information to:
        </p>
        <ul>
          <li>Respond to inquiries and provide customer support</li>
          <li>Send updates, newsletters, and promotional messages (only with your consent)</li>
          <li>Improve our website and user experience</li>
        </ul>

        <h4 className="mt-5">3. Cookies</h4>
        <p>
          We may use cookies and similar tracking technologies to enhance your experience on our website. You can choose to disable cookies
          through your browser settings.
        </p>

        <h4 className="mt-5">4. Third-Party Links</h4>
        <p>
          Our site may contain links to third-party websites. We are not responsible for the privacy practices of these websites and encourage you to review their policies.
        </p>

        <h4 className="mt-5">5. Data Protection</h4>
        <p>
          We take appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h4 className="mt-5">6. Changes to This Policy</h4>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated date.
        </p>

        <h4 className="mt-5">7. Contact Us</h4>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at:
        </p>
        <ul>
          <li>Email: <a href="mailto:newsroom@naijagossip.com">newsroom@naijagossip.com</a></li>
          <li>Phone: <a href="tel:+2347061043812">+2347061043812</a></li>
        </ul>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
