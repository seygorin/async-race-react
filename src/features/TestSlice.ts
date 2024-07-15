import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "example",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value += 1;
    },
    decrement: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = testSlice.actions;
export default testSlice.reducer;
