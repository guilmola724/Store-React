import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/add", async (id) => {
   const { data } = await axios.post(`/cart`, { product_id: id });

   return data;
});

export const fetchCartItems = createAsyncThunk("cart/fetchAll", async () => {
   const { data } = await axios.get(`/cart`);

   return data;
});
export const clearCart = createAsyncThunk("cart/clearCart", async () => {
   const { data } = await axios.delete(`/cart/delete_all`);
   return data;
});
export const removeItemFromCart = createAsyncThunk(
   "cart/removeItem",
   async (_id) => {
      const { data } = await axios.delete(`/cart/delete`, { product_id: _id });
      return data;
   }
);
export const incrementCartItem = createAsyncThunk(
   "cart/incrementItem",
   async (_id) => {
      const { data } = await axios.patch(`/cart/increment`, {
         product_id: _id,
      });
      return data;
   }
);
export const decrementCartItem = createAsyncThunk(
   "cart/removeItem",
   async (_id) => {
      const { data } = await axios.patch(`/cart/decrement`, {
         product_id: _id,
      });
      return data;
   }
);

export const cartSlice = createSlice({
   name: "cart",
   initialState: {
      cartItems: [],
      cartLength: 0,
      error: false,
      pending: false,
   },
   reducers: {
      resetCart: (state) => {
         state.cartItems = [];
         state.cartLength = 0;
         state.error = false;
         state.pending = false;
      },
   },
   extraReducers: {
      [addToCart.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },
      [addToCart.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = action.payload.products;
         state.cartLength = action.payload.count;
      },
      [addToCart.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
      [fetchCartItems.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },

      [fetchCartItems.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = action.payload.products;
         state.cartLength = action.payload.count;
      },

      [fetchCartItems.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
      [clearCart.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },

      [clearCart.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = [];
         state.cartLength = 0;
      },

      [clearCart.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
      [removeItemFromCart.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },

      [removeItemFromCart.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = action.payload.products;
         state.cartLength = action.payload.count;
      },

      [removeItemFromCart.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
      [incrementCartItem.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },

      [incrementCartItem.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = action.payload.products;
         state.cartLength = action.payload.count;
      },

      [incrementCartItem.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
      [decrementCartItem.pending]: (state, action) => {
         state.pending = true;
         state.error = false;
      },

      [decrementCartItem.fulfilled]: (state, action) => {
         state.pending = false;
         state.error = false;
         state.cartItems = action.payload.products;
         state.cartLength = action.payload.count;
      },
      [decrementCartItem.rejected]: (state, action) => {
         state.pending = false;
         state.error = true;
      },
   },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
