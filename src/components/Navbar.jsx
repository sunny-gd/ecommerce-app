import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);

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
            <Link to="/about" className="nav-item">About Us</Link>
            <Link to="/cart" className="nav-cart">
              <FaShoppingCart />
              {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
            </Link>
          </div>
        </div>

        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/about" className="mobile-item" onClick={toggleMobileMenu}>
            About Us
          </Link>
          <Link to="/cart" className="mobile-cart" onClick={toggleMobileMenu}>
            <FaShoppingCart />
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;