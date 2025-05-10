import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import './ProductDetailsModal.css';

const ProductDetailsModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const additionalImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? additionalImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === additionalImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const setImageIndex = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-layout" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-product-name top-left">{product.name}</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="modal-image-section">
            <button className="arrow-btn left-arrow" onClick={prevImage}>{'<'}</button>
            <img
              src={additionalImages[currentImageIndex]}
              alt={`${product.name} ${currentImageIndex + 1}`}
              className="modal-single-image"
            />
            <button className="arrow-btn right-arrow" onClick={nextImage}>{'>'}</button>
          </div>
          <div className="progress-dots">
            {additionalImages.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
          <p className="modal-product-price left-align">${product.price.toFixed(2)}</p>
          <div className="modal-product-details">
            <p>Here are some necessary details about the product.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
            <p>Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
            <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.</p>
            <p>Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
            <p>Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.</p>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
            <p>Donec suscipit eros. Nam mi. Proin viverra leo ut odio.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-add-to-cart-btn center-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
