import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catsApi } from "../api/catsApi";

export interface Cat {
  id: number;
  name: string;
  color: string;
}

export interface GarageState {
  cats: Cat[];
  totalCount: number;
  error: string | null;
  currentPage: number;
  positions: Record<number, number>;
  winner: Cat | null;
  isRacing: Record<number, boolean>;
  stoppedCats: number[];
  startTime: Record<number, number>;
}

const initialState: GarageState = {
  cats: [],
  totalCount: 0,
  error: null,
  currentPage: 1,
  positions: {},
  winner: null,
  isRacing: {},
  stoppedCats: [],
  startTime: {},
};

const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return { ...state, currentPage: action.payload };
    },
    setPositions: (state, action: PayloadAction<Record<number, number>>) => {
      return { ...state, positions: action.payload };
    },
    setWinner: (state, action: PayloadAction<Cat | null>) => {
      return { ...state, winner: action.payload };
    },
    setIsRacing: (state, action: PayloadAction<Record<number, boolean>>) => {
      return { ...state, isRacing: { ...state.isRacing, ...action.payload } };
    },
    setStoppedCats: (state, action: PayloadAction<number[]>) => {
      return { ...state, stoppedCats: action.payload };
    },
    setStartTime: (state, action: PayloadAction<Record<number, number>>) => {
      return { ...state, startTime: { ...state.startTime, ...action.payload } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(catsApi.endpoints.getCats.matchPending, (state) => {
        return state;
      })
      .addMatcher(
        catsApi.endpoints.getCats.matchFulfilled,
        (state, action: PayloadAction<{ data: Cat[]; totalCount: number }>) => {
          return {
            ...state,
            cats: action.payload.data,
            totalCount: action.payload.totalCount,
          };
        },
      )
      .addMatcher(catsApi.endpoints.getCats.matchRejected, (state, action) => {
        return { ...state, error: action.error.message || null };
      })
      .addMatcher(
        catsApi.endpoints.addCat.matchFulfilled,
        (state, action: PayloadAction<Cat>) => {
          return {
            ...state,
            cats: [...state.cats, action.payload],
            totalCount: state.totalCount + 1,
          };
        },
      )
      .addMatcher(
        catsApi.endpoints.updateCat.matchFulfilled,
        (state, action: PayloadAction<Cat>) => {
          const newCats = state.cats.map((cat) =>
            cat.id === action.payload.id ? action.payload : cat,
          );
          return { ...state, cats: newCats };
        },
      )
      .addMatcher(
        catsApi.endpoints.deleteCat.matchFulfilled,
        (state, action: PayloadAction<number>) => {
          return {
            ...state,
            cats: state.cats.filter((cat) => cat.id !== action.payload),
            totalCount: state.totalCount - 1,
          };
        },
      );
  },
});

export const {
  setCurrentPage,
  setPositions,
  setWinner,
  setIsRacing,
  setStoppedCats,
  setStartTime,
} = garageSlice.actions;

export default garageSlice.reducer;
