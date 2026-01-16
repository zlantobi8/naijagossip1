import Header from "./../components/Header";
import Footer from "./../components/Footer";

export const metadata = {
  title: "DMCA Notice | Trendzlib",
  description: "Read the DMCA notice for Trendzlib and how copyright complaints are handled.",
};

export default function DmcaPage() {
  return (
    <main>
   
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#fff" }}>
        <h1>DMCA Notice</h1>
        <p>Trendzlib respects copyright laws and complies with the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted content has been uploaded without permission, follow the instructions below.</p>
        
        <h2>Filing a Complaint</h2>
        <p>To file a DMCA complaint, please send an email to <a href="mailto:dmca@trendzlib.com">dmca@trendzlib.com</a> with the following information:</p>
        <ul>
          <li>Identification of the copyrighted work.</li>
          <li>URL(s) of the content in question.</li>
          <li>Your contact information (email, phone).</li>
          <li>A statement that you believe in good faith the use is unauthorized.</li>
          <li>A statement under penalty of perjury that the information is accurate.</li>
          <li>Your electronic signature.</li>
        </ul>
        
        <h2>Processing the Complaint</h2>
        <p>Once we receive a valid DMCA notice, we will remove or disable access to the infringing material promptly.</p>
        
        <h2>Repeat Infringers</h2>
        <p>Users who repeatedly upload copyrighted content without authorization may have their access permanently disabled.</p>
        
        <h2>Contact</h2>
        <p>For DMCA questions, contact <a href="mailto:dmca@trendzlib.com">dmca@trendzlib.com</a>.</p>
      </div>
 
    </main>
  );
}
