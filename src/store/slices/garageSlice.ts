import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCats, addCat, updateCat, deleteCat } from "../api/garageApi";

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
      .addCase(fetchCats.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(
        fetchCats.fulfilled,
        (state, action: PayloadAction<{ data: Cat[]; totalCount: number }>) => {
          return {
            ...state,
            status: "succeeded",
            cats: action.payload.data,
            totalCount: action.payload.totalCount,
          };
        },
      )
      .addCase(fetchCats.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || null,
        };
      })
      .addCase(addCat.fulfilled, (state, action: PayloadAction<Cat>) => {
        return {
          ...state,
          cats: [...state.cats, action.payload],
          totalCount: state.totalCount + 1,
        };
      })
      .addCase(updateCat.fulfilled, (state, action: PayloadAction<Cat>) => {
        const index = state.cats.findIndex(
          (cat) => cat.id === action.payload.id,
        );
        if (index !== -1) {
          const newCats = [...state.cats];
          newCats[index] = action.payload;
          return { ...state, cats: newCats };
        }
        return state;
      })
      .addCase(deleteCat.fulfilled, (state, action: PayloadAction<number>) => {
        return {
          ...state,
          cats: state.cats.filter((cat) => cat.id !== action.payload),
          totalCount: state.totalCount - 1,
        };
      });
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
