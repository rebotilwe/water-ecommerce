import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-sections">
      <div className="footer-brand">
        {/* <img src="https://via.placeholder.com/120x40?text=LOGO" alt="Logo" className="footer-logo" /> */}
        <p className="footer-description">
          For questions or feedback, reach out any time. Serving you since 2024.
        </p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h4>Contact</h4>
        <p>+27-063-577-3160</p>
        <p>rebotilwemokiba@gmail.com</p>
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LN</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <hr />
      <p>© 2024 Rebotilwe Mokiba — All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
