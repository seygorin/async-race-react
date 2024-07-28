import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./slices/garageSlice";
import engineReducer from "./slices/engineSlice";
import winnersReducer from "./slices/winnersSlice";
import modalReducer from "./slices/modalSlice";
import catFormReducer from "./slices/catFormSlice";

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
    modal: modalReducer,
    catForm: catFormReducer,
  },
});

export default store;
