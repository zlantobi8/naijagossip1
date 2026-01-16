import Header from "./../components/Header";
import Footer from "./../components/Footer";

export const metadata = {
  title: "Privacy Policy | Trendzlib",
  description: "Read the Privacy Policy for Trendzlib. Learn how we handle data, cookies, and user privacy.",
};

export default function PrivacyPage() {
  return (
    <main>
     
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#fff" }}>
        <h1>Privacy Policy</h1>
        <p>At Trendzlib, we respect your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect your data.</p>
        
        <h2>Information We Collect</h2>
        <p>We may collect certain non-personal information, including your browser type, device information, and IP address. We do not collect personal information without your consent.</p>
        
        <h2>Use of Cookies</h2>
        <p>Trendzlib uses cookies and similar technologies to improve your browsing experience, remember your preferences, and serve ads. You can disable cookies in your browser, but some features may not work properly.</p>
        
        <h2>Data Sharing</h2>
        <p>We do not sell your data. We may share anonymized, aggregated data with partners for analytics and advertising purposes.</p>
        
        <h2>Third-Party Services</h2>
        <p>Our site may include links to third-party services and advertisements. We are not responsible for the privacy practices of these third parties.</p>
        
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the date of update.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@trendzlib.com">support@trendzlib.com</a>.</p>
      </div>
    </main>
  );
}
