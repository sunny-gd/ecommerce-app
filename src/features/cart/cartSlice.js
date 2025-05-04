import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
      state.totalQuantity++;
      state.totalAmount += action.payload.price;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload);
      } else {
        existingItem.quantity--;
      }
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const totalCartItems = (state) => state.cart.items.length;

export default cartSlice.reducer;
