import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const calculateTotals = (state) => {
  state.itemPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );

  state.shippingPrice = state.itemPrice > 499 ? 0 : 40;
  state.taxPrice = Number((0.18 * state.itemPrice).toFixed(2));
  state.totalPrice =
    Number(state.itemPrice.toFixed(0)) +
    Number(state.shippingPrice.toFixed(0)) +
    Number(state.taxPrice.toFixed(0));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((a) => a._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((a) =>
          a._id === existingItem._id ? item : a
        );
      } else {
        state.cartItems.push(item);
      }

      calculateTotals(state);
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) item.qty = qty;

      calculateTotals(state);
    },

    removeCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      calculateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      calculateTotals(state);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, updateQty, removeCart, clearCart } =
  cartSlice.actions;
