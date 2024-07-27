import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./slices/garageSlice";
import engineReducer from "./slices/engineSlice";
import winnersReducer from "./slices/winnersSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
    modal: modalReducer,
  },
});

export default store;
