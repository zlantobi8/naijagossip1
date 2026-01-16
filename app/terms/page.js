import Header from "./../components/Header";
import Footer from "./../components/Footer";

export const metadata = {
  title: "Terms of Service | Trendzlib",
  description: "Read the Terms of Service for Trendzlib. Understand user rules, responsibilities, and website usage.",
};

export default function TermsPage() {
  return (
    <main>
  
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#fff" }}>
        <h1>Terms of Service</h1>
        <p>Welcome to Trendzlib. By using our website, you agree to follow these Terms of Service. Please read carefully before accessing or using our services.</p>
        
        <h2>Use of Website</h2>
        <p>You may use Trendzlib for personal, non-commercial purposes only. You agree not to use the website for any illegal activities or in violation of any laws.</p>
        
        <h2>Content</h2>
        <p>All videos and content on Trendzlib are sourced via our API. We do not claim ownership of third-party content. Users are responsible for ensuring that content is not shared unlawfully.</p>
        
        <h2>User Conduct</h2>
        <p>You agree not to upload, post, or share content that is illegal, harmful, or violates copyright laws. Any abuse may result in banning or reporting to authorities.</p>
        
        <h2>Disclaimer</h2>
        <p>Trendzlib provides videos and content “as-is.” We do not guarantee accuracy, completeness, or uptime. Use the site at your own risk.</p>
        
        <h2>Changes to Terms</h2>
        <p>We may update these Terms of Service from time to time. Updates will be posted here with the effective date.</p>
        
        <h2>Contact</h2>
        <p>For questions regarding these Terms, contact us at <a href="mailto:support@trendzlib.com">support@trendzlib.com</a>.</p>
      </div>
   
    </main>
  );
}
