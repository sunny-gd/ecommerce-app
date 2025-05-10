import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from './productSlice';
import { addItem } from '../cart/cartSlice';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import './Products.css';
import { ProductsData } from './ProductData';

// Mock product data
const mockProducts = ProductsData

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
