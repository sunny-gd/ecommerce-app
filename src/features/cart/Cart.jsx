import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
  removeItem,
  clearCart,
  addItem
} from './cartSlice';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart ({totalQuantity})</h2>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleDecrement(item.id)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>Qty: {item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button 
              onClick={handleClearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
