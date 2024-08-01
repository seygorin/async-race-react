import { configureStore } from "@reduxjs/toolkit";
import { catsApi } from "@store/api/catsApi";
import { engineApi } from "@store/api/engineApi";
import garageReducer from "./slices/garageSlice";
import engineReducer from "./slices/engineSlice";
import winnersReducer from "./slices/winnersSlice";
import modalReducer from "./slices/modalSlice";
import catFormReducer from "./slices/catFormSlice";

export const store = configureStore({
  reducer: {
    [catsApi.reducerPath]: catsApi.reducer,
    [engineApi.reducerPath]: engineApi.reducer,
    garage: garageReducer,
    engine: engineReducer,
    winners: winnersReducer,
    modal: modalReducer,
    catForm: catFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware, engineApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
