export default function Footer() {
  return (
    <>
      <style>{`
        /* Added Syne and kept Oi for the big branding */
        @import url('https://fonts.googleapis.com/css2?family=Oi&family=Syne:wght@400..800&display=swap');
        
        .footer-link { 
          color:#999; 
          text-decoration:none; 
          font-size:16px; 
          line-height:1.6; 
          transition:color 0.3s; 
          font-family: 'Syne', sans-serif;
        }
        .footer-link:hover { color:#fff; }
        
        .social-btn { 
          width:36px; 
          height:36px; 
          border-radius:50%; 
          background:#1a1a1a; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          color:#fff; 
          text-decoration:none; 
          font-size:14px; 
          transition:background 0.3s, transform 0.3s; 
        }
        .social-btn:hover { background:#333; transform:translateY(-3px); }
        
        @media (max-width: 768px) {
          .f-inner { flex-direction:column !important; gap:32px !important; }
          .f-right { text-align:left !important; }
          .f-fixed { padding:40px 30px 0 !important; }
          .f-big   { white-space:normal !important; }
        }
      `}</style>

      <footer
        className="f-fixed"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "50px 80px 0",
          zIndex: 0,
          fontFamily: "'Syne', sans-serif",
        }}
      >
        <div
          className="f-inner"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "auto",
          }}
        >
          <div style={{ maxWidth: "420px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px", textTransform: "uppercase" }}>
              About Us
            </h3>
            <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#999", marginBottom: "16px", fontWeight: 400 }}>
              We're a team of passionate designers and developers dedicated to
              crafting exceptional digital experiences that make a lasting impact.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["𝕏", "in", "◉", "ƒ"].map((s) => (
                <a key={s} href="#" className="social-btn">{s}</a>
              ))}
            </div>
          </div>

          <div className="f-right" style={{ textAlign: "right", minWidth: "140px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px", textTransform: "uppercase" }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Home", "Products", "About Us", "Affiliate", "Contact",].map((link) => (
                <li key={link} style={{ marginBottom: "2px" }}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h1
          className="f-big"
          style={{
            fontFamily: "'Oi', serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 8vw, 100px)",
            whiteSpace: "nowrap",
            marginTop: "auto",
            lineHeight: 1,
            paddingBottom: "8px",
          }}
        >
          DAPORTER
        </h1>
      </footer>
    </>
  );
}