import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { catsApi } from "../api/catsApi";

export interface Cat {
  id: number;
  name: string;
  color: string;
}

export interface GarageState {
  cats: Cat[];
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
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
  status: "idle",
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
      state.currentPage = action.payload;
    },
    setPositions: (state, action: PayloadAction<Record<number, number>>) => {
      state.positions = action.payload;
    },
    setWinner: (state, action: PayloadAction<Cat | null>) => {
      state.winner = action.payload;
    },
    setIsRacing: (state, action: PayloadAction<Record<number, boolean>>) => {
      state.isRacing = { ...state.isRacing, ...action.payload };
    },
    setStoppedCats: (state, action: PayloadAction<number[]>) => {
      state.stoppedCats = action.payload;
    },
    setStartTime: (state, action: PayloadAction<Record<number, number>>) => {
      state.startTime = { ...state.startTime, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(catsApi.endpoints.getCats.matchPending, (state) => {
        state.status = "loading";
      })
			.addMatcher(
				catsApi.endpoints.getCats.matchFulfilled,
				(state, action: PayloadAction<{ data: Cat[]; totalCount: number }>) => {
					state.status = "succeeded";
					state.cats = action.payload.data;
					state.totalCount = action.payload.totalCount;
				},
      )
      .addMatcher(catsApi.endpoints.getCats.matchRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addMatcher(
        catsApi.endpoints.addCat.matchFulfilled,
        (state, action: PayloadAction<Cat>) => {
          state.cats = [...state.cats, action.payload];
          state.totalCount += 1;
        },
      )
      .addMatcher(
        catsApi.endpoints.updateCat.matchFulfilled,
        (state, action: PayloadAction<Cat>) => {
          const newCats = [...state.cats];
          const index = newCats.findIndex(
            (cat) => cat.id === action.payload.id,
          );
          if (index !== -1) {
            newCats[index] = action.payload;
          }
          state.cats = newCats;
        },
      )
      .addMatcher(
        catsApi.endpoints.deleteCat.matchFulfilled,
        (state, action: PayloadAction<number>) => {
          state.cats = state.cats.filter((cat) => cat.id !== action.payload);
          state.totalCount -= 1;
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
