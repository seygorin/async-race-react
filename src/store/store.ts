import { configureStore } from "@reduxjs/toolkit";
import { apiBuilder } from "@store/api/apiBuilder";
import garageReducer from "./slices/garageSlice";
import engineReducer from "./slices/engineSlice";
import winnersReducer from "./slices/winnersSlice";
import modalReducer from "./slices/modalSlice";
import catFormReducer from "./slices/catFormSlice";

export const store = configureStore({
  reducer: {
    [apiBuilder.reducerPath]: apiBuilder.reducer, // Добавьте новый reducer
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
    modal: modalReducer,
    catForm: catFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBuilder.middleware), // Добавьте новый middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
