import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from './productSlice';
import { addItem } from '../cart/cartSlice';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import './Products.css';

// Mock product data
const mockProducts = [
  { id: 1, name: 'Premium Headphones', price: 199.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80',
  ] },
  { id: 2, name: 'Wireless Keyboard', price: 89.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
  ] },
  { id: 3, name: 'Bluetooth Speaker', price: 129.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80',
  ] },
  { id: 4, name: 'Smart Watch', price: 249.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
  ] },
  { id: 5, name: 'Gaming Mouse', price: 59.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80',
  ] },
  { id: 6, name: '4K Monitor', price: 399.99, images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
  ] },
  ];

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductDetailsModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Products;
