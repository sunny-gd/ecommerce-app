import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalAmount, clearCart } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './Checkout.css';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Order Summary', 14, 20);

    let y = 30;
    cartItems.forEach((item, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${item.name}`, 14, y);
      y += 7;
      doc.setFontSize(12);
      doc.text(`Quantity: ${item.quantity}`, 20, y);
      y += 7;
      doc.text(`Price: $${item.price.toFixed(2)}`, 20, y);
      y += 10;
    });

    doc.setFontSize(16);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, y);
    y += 15;

    doc.setFontSize(18);
    doc.text('User Details', 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 14, y);
    y += 7;
    doc.text(`Contact Number: ${formData.contactNumber}`, 14, y);
    y += 7;
    doc.text(`Email: ${formData.email}`, 14, y);
    y += 7;
    doc.text(`Address: ${formData.address}`, 14, y);

    doc.save('order_summary.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
    setShowPopup(true);
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Checkout Page</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="order-items">
            {cartItems.map(item => (
              <li key={item.id} className="order-item">
                <img src={item.images && item.images.length > 0 ? item.images[0] : item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <p className="order-item-name">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3 className="order-total">Total: ${totalAmount.toFixed(2)}</h3>
      </div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>User Details</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <label>
          Email ID:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Full Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <button type="submit" className="submit-order-btn">Submit Order</button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Your order placed successfully</p>
            <button onClick={handlePopupOk} className="popup-ok-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
