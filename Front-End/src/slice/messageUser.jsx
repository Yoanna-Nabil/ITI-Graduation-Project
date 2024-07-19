import { createSlice } from "@reduxjs/toolkit";

export const messageUser = createSlice({
  name: "messageUser",
  initialState: {
    messageUser: [],
  },
  reducers: {
    setMessageUser: (state, action) => {
      state.messageUser = action.payload;
    },
  },
});

export const { setMessageUser } = messageUser.actions;
const messageUserReducer = messageUser.reducer;
export default messageUserReducer;
