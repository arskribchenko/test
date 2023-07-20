import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "friends",
  initialState: {
    friends: null,
   
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
