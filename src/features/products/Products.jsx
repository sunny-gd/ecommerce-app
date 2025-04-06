import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from './productSlice';
import { addItem } from '../cart/cartSlice';
import './Products.css';

// Mock product data
const mockProducts = [
  { id: 1, name: 'Premium Headphones', price: 199.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Wireless Keyboard', price: 89.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Bluetooth Speaker', price: 129.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Smart Watch', price: 249.99, image: 'https://via.placeholder.com/300' },
  { id: 5, name: 'Gaming Mouse', price: 59.99, image: 'https://via.placeholder.com/300' },
  { id: 6, name: '4K Monitor', price: 399.99, image: 'https://via.placeholder.com/300' },
];

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    // In a real app, this would be an API call
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
