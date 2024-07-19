// store.js
import { configureStore } from "@reduxjs/toolkit";
import wishListReducer from "../slice/slice";
import messageUserReducer from "../slice/messageUser";
const store = configureStore({
  reducer: {
    favoriteproducts: wishListReducer,
    messageUser: messageUserReducer,
  },
});

export default store;
