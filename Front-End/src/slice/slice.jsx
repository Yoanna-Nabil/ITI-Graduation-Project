import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "favoriteproducts",
  initialState: {
    products: [],
  },
  reducers: {
    setWishList: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setWishList } = wishListSlice.actions;
const wishListReducer = wishListSlice.reducer;
export default wishListReducer;
