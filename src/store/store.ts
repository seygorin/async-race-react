import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./slices/garageSlice";
import engineReducer from "./slices/engineSlice";
import winnersReducer from "./slices/winnersSlice";

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
  },
});

export default store;
