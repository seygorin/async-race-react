import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";
import { Winner } from "./winnersSlice";

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
  winner: Winner | null;
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

const handleGetCatsFulfilled = (
  state: GarageState,
  action: PayloadAction<{ data: Cat[]; totalCount: number }>,
) => ({
  ...state,
  cats: action.payload.data,
  totalCount: action.payload.totalCount,
});

const handleAddCatFulfilled = (
  state: GarageState,
  action: PayloadAction<Cat>,
) => ({
  ...state,
  cats: [...state.cats, action.payload],
  totalCount: state.totalCount + 1,
});

const handleUpdateCatFulfilled = (
  state: GarageState,
  action: PayloadAction<Cat>,
) => ({
  ...state,
  cats: state.cats.map((cat) =>
    cat.id === action.payload.id ? action.payload : cat,
  ),
});

const handleDeleteCatFulfilled = (
  state: GarageState,
  action: PayloadAction<number>,
) => ({
  ...state,
  cats: state.cats.filter((cat) => cat.id !== action.payload),
  totalCount: state.totalCount - 1,
});

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
      .addMatcher(apiBuilder.endpoints.getCats.matchPending, (state) => state)
      .addMatcher(
        apiBuilder.endpoints.getCats.matchFulfilled,
        handleGetCatsFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.getCats.matchRejected,
        (state, action) => ({
          ...state,
          error: action.error.message || null,
        }),
      )
      .addMatcher(
        apiBuilder.endpoints.addCat.matchFulfilled,
        handleAddCatFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.updateCat.matchFulfilled,
        handleUpdateCatFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.deleteCat.matchFulfilled,
        handleDeleteCatFulfilled,
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
