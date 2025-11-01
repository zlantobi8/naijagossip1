import Nav1 from "@/app/components/Nav1";
import Footer from "@/app/Footer";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "About Trendzlib - Your Money Growth Partner",
  description: "Learn how Trendzlib helps everyday Nigerians achieve financial freedom through proven money-making strategies and investment guides.",
  alternates: {
    canonical: "https://www.trendzlib.com.ng/about",
  }
};

export default function About() {
  return (
    <div className="bg-light text-dark">
      <div className="navbar-area" style={{ background: '#22c55e' }}>
        <Nav1 />
      </div>

      <div className="container py-5" style={{ fontSize: "1rem", lineHeight: "1.8", maxWidth: "800px" }}>
        <h1 className="text-center mb-5" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
          About Trendzlib
        </h1>

        {/* Mission Statement */}
        <div className="mb-5 p-4 rounded" style={{ background: "#f0fdf4", border: "2px solid #22c55e" }}>
          <h3 className="text-center mb-3" style={{ color: "#16a34a" }}>Our Mission</h3>
          <p className="text-center fs-5 mb-0">
            We help everyday Nigerians break free from financial struggle by teaching proven money-making strategies, 
            smart investing, and sustainable income growth.
          </p>
        </div>

        {/* The Story */}
        <h2 className="mb-4">Our Story</h2>
        <p>
          <strong>Trendzlib</strong> started from a simple observation: thousands of Nigerians are making ₦200k-₦500k monthly 
          through freelancing, cryptocurrency, and side hustles — but most people don't know where to start.
        </p>

        <p>
          We saw friends and family struggling with low income, expensive Lagos rent, and limited job opportunities. 
          Meanwhile, others were quietly building wealth online. The difference? <strong>They had the right information.</strong>
        </p>

        <p>
          That's why we created Trendzlib — to bridge that gap. We're not financial gurus or get-rich-quick schemers. 
          We're regular Nigerians who learned these strategies, tested them, and now we're sharing what actually works.
        </p>

        {/* What We Do */}
        <h2 className="mt-5 mb-4">What We Do</h2>
        
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4 h-100 rounded" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
              <h4 style={{ color: "#22c55e" }}>💰 Make Money Online</h4>
              <p className="mb-0">
                Step-by-step guides on freelancing, remote work, digital products, and legitimate online opportunities 
                for Nigerians.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 h-100 rounded" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
              <h4 style={{ color: "#3b82f6" }}>📈 Invest Smart</h4>
              <p className="mb-0">
                Practical advice on cryptocurrency, stocks, savings apps, and investment strategies designed for 
                the Nigerian market.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 h-100 rounded" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
              <h4 style={{ color: "#f59e0b" }}>💼 Side Hustles</h4>
              <p className="mb-0">
                Realistic business ideas and side income opportunities you can start with little to no capital 
                in Nigeria.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 h-100 rounded" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
              <h4 style={{ color: "#8b5cf6" }}>🎓 Financial Education</h4>
              <p className="mb-0">
                Real talk about money management, avoiding scams, and building long-term wealth in the Nigerian 
                economy.
              </p>
            </div>
          </div>
        </div>

        {/* Why Trust Us */}
        <h2 className="mb-4">Why Trust Trendzlib?</h2>
        
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li className="mb-3">
            <strong>✅ Nigerian-Focused:</strong> Everything we share is tested for the Nigerian market — no generic 
            advice that doesn't work here.
          </li>
          <li className="mb-3">
            <strong>✅ Honest & Transparent:</strong> We tell you what works AND what doesn't. No fake promises or 
            overnight millionaire schemes.
          </li>
          <li className="mb-3">
            <strong>✅ Actionable Content:</strong> Every guide has clear steps you can follow today. No fluff, 
            just results.
          </li>
          <li className="mb-3">
            <strong>✅ Real Results:</strong> Our readers have started freelancing careers, made their first crypto 
            profits, and launched side businesses.
          </li>
          <li className="mb-3">
            <strong>✅ Free Resources:</strong> Most of our content is completely free because we believe financial 
            education should be accessible to everyone.
          </li>
        </ul>

        {/* Our Values */}
        <h2 className="mt-5 mb-4">Our Values</h2>
        
        <div className="p-4 rounded mb-5" style={{ background: "#fef3c7", border: "2px solid #f59e0b" }}>
          <p className="mb-2"><strong>🎯 Practical Over Theoretical:</strong> We teach what works in real life, not textbook theory.</p>
          <p className="mb-2"><strong>💪 Empowerment:</strong> You don't need a degree or connections — just the right knowledge and action.</p>
          <p className="mb-2"><strong>🤝 Community:</strong> We're building a community of Nigerians who support each other's financial growth.</p>
          <p className="mb-0"><strong>📈 Long-term Thinking:</strong> Quick money is nice, but we focus on sustainable income and wealth building.</p>
        </div>

        {/* Who This Is For */}
        <h2 className="mb-4">Who Is Trendzlib For?</h2>
        
        <p>Our content is perfect for:</p>
        <ul>
          <li><strong>9-5 workers</strong> looking for side income to supplement their salary</li>
          <li><strong>Students</strong> who want to make money while studying</li>
          <li><strong>Job seekers</strong> tired of the Nigerian job market stress</li>
          <li><strong>Entrepreneurs</strong> looking for new business ideas</li>
          <li><strong>Anyone</strong> serious about improving their financial situation</li>
        </ul>

        {/* Join Us */}
        <div className="text-center mt-5 p-5 rounded" style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", color: "white" }}>
          <h2 className="mb-3">Ready to Start Your Money Journey?</h2>
          <p className="fs-5 mb-4">
            Join thousands of Nigerians who are taking control of their finances
          </p>
          <Link href="/" className="btn btn-light btn-lg px-5 py-3" style={{ borderRadius: "50px", fontWeight: "600" }}>
            Explore Free Guides
          </Link>
        </div>

        {/* Contact Section */}
        <h2 className="mt-5 mb-4">Get in Touch</h2>
        
        <p>Have questions, feedback, or want to share your success story?</p>

        <div className="p-4 rounded" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
          <p className="mb-2"><strong>📧 Email:</strong> <Link href="mailto:newsroom@trendzlib.com">newsroom@trendzlib.com</Link></p>
          <p className="mb-2"><strong>📱 WhatsApp:</strong> <Link href="https://wa.me/2347061043812" target="_blank" rel="noopener noreferrer">+234 706 104 3812</Link></p>
          <p className="mb-2"><strong>🐦 Twitter:</strong> <Link href="https://twitter.com/trendzlib" target="_blank" rel="noopener noreferrer">@trendzlib</Link></p>
          <p className="mb-0"><strong>📘 Facebook:</strong> <Link href="https://www.facebook.com/officialtrendzlib" target="_blank" rel="noopener noreferrer">facebook.com/officialtrendzlib</Link></p>
        </div>

        <p className="mt-4 text-center text-muted fst-italic">
          "Your financial freedom journey starts with the decision to learn. Let's build wealth together." 💚
        </p>
      </div>

      <Footer />
    </div>
  );
}