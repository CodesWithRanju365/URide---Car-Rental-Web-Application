// components/Footer.tsx
"use client";
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="marmik-footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>URide Car Rental, Karnataka </h3>
    
          <p>One-way & round-trip car rentals across Karnataka’s top tourist spots. Comfort, safety, and flexibility—on wheels.</p>
        <p>Our Assistant will call you once the booking is done.</p>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: support@uridecarrental.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Hours: 8 AM – 9 PM, Mon–Sun</p>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <p>Instagram: @URidecarrental</p>
          <p>Facebook: /URidecarrental</p>
          <p>Twitter: @URidecarrental</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CarRental India. Built with ❤️ for travelers in Karnataka.</p>
      </div>
    </footer>
  );
};

export default Footer;
