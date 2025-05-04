import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { totalCartItems } from '../features/cart/cartSlice';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useSelector(totalCartItems);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <h2>ShopEase</h2>
          </Link>
        </div>
        
        <div className="navbar-right">
          <div className="desktop-nav">
            <Link to="/test1" className="nav-item">Test-1</Link>
            <Link to="/test2" className="nav-item">Test-2</Link>
            <Link to="/about" className="nav-item">About Us</Link>
          </div>

          <Link to="/cart" className="nav-cart">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/test1" className="mobile-item" onClick={toggleMobileMenu}>
            Test-1
          </Link>
          <Link to="/test2" className="mobile-item" onClick={toggleMobileMenu}>
            Test-2
          </Link>
          <Link to="/about" className="mobile-item" onClick={toggleMobileMenu}>
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
