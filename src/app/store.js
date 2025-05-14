import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Could not load cart state', err);
    return undefined;
  }
};

// Save cart state to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.warn('Could not save cart state', err);
  }
};

const preloadedState = {
  cart: loadCartState(),
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
