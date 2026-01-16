export default function Footer() {
  return (
    <footer style={{
      background: "#121212",
      color: "#aaa",
      padding: "20px 40px",
      textAlign: "center",
      marginTop: "40px",
    }}>
      <div style={{ marginBottom: "12px" }}>
        <a href="/privacy" style={{ margin: "0 10px", color: "#aaa" }}>Privacy Policy</a>|
        <a href="/terms" style={{ margin: "0 10px", color: "#aaa" }}>Terms of Service</a>|
        <a href="/dmca" style={{ margin: "0 10px", color: "#aaa" }}>DMCA</a>|
        <a href="/sitemap.xml" style={{ margin: "0 10px", color: "#aaa" }}>Sitemap</a>
      </div>
      <div style={{ fontSize: "14px" }}>
        &copy; {new Date().getFullYear()} Trendzlib. All rights reserved.
      </div>
    </footer>
  );
}
