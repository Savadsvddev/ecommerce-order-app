// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCartItems } from '../../api/cartApi';

// ✅ Async thunk to fetch cart data
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  let userId = localStorage.getItem("shop_id")
  const response  = await getCartItems(userId);
  console.log({response})
  return response;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log({action})
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
