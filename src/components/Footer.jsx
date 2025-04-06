import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-section">
        <h3>Contact Us</h3>
        <p>Email: contact@ecommerce.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} E-Commerce App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;