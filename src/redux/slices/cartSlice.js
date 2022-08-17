import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // const findItem = state.items.find((obj) => obj.id === action.payload.id);
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    minusItem(state, action) {
      // const findItem = state.items.find((obj) => obj.id === action.payload);
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) findItem.count--;

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    removeItem(state, action) {
      // state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type,
      );

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    clearItems(state) {
      state.items = [];

      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
