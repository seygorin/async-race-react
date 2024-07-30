import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
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

const handleFetchCatsPending = (state: GarageState): GarageState => ({
  ...state,
  status: "loading",
});

const handleFetchCatsFulfilled = (
  state: GarageState,
  action: PayloadAction<{ data: Cat[]; totalCount: number }>,
): GarageState => ({
  ...state,
  status: "succeeded",
  cats: action.payload.data,
  totalCount: action.payload.totalCount,
});

const handleFetchCatsRejected = (
  state: GarageState,
  action: PayloadAction<unknown, string, unknown, SerializedError>,
): GarageState => ({
  ...state,
  status: "failed",
  error: action.error.message || null,
});

const handleAddCatFulfilled = (
  state: GarageState,
  action: PayloadAction<Cat>,
): GarageState => ({
  ...state,
  cats: [...state.cats, action.payload],
  totalCount: state.totalCount + 1,
});

const handleUpdateCatFulfilled = (
  state: GarageState,
  action: PayloadAction<Cat>,
): GarageState => {
  const newCats = [...state.cats];
  const index = newCats.findIndex((cat) => cat.id === action.payload.id);
  if (index !== -1) {
    newCats[index] = action.payload;
  }
  return { ...state, cats: newCats };
};

const handleDeleteCatFulfilled = (
  state: GarageState,
  action: PayloadAction<number>,
): GarageState => ({
  ...state,
  cats: state.cats.filter((cat) => cat.id !== action.payload),
  totalCount: state.totalCount - 1,
});

const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
    setPositions: (state, action: PayloadAction<Record<number, number>>) => ({
      ...state,
      positions: action.payload,
    }),
    setWinner: (state, action: PayloadAction<Cat | null>) => ({
      ...state,
      winner: action.payload,
    }),
    setIsRacing: (state, action: PayloadAction<Record<number, boolean>>) => ({
      ...state,
      isRacing: { ...state.isRacing, ...action.payload },
    }),
    setStoppedCats: (state, action: PayloadAction<number[]>) => ({
      ...state,
      stoppedCats: action.payload,
    }),
    setStartTime: (state, action: PayloadAction<Record<number, number>>) => ({
      ...state,
      startTime: { ...state.startTime, ...action.payload },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, handleFetchCatsPending)
      .addCase(fetchCats.fulfilled, handleFetchCatsFulfilled)
      .addCase(fetchCats.rejected, handleFetchCatsRejected)
      .addCase(addCat.fulfilled, handleAddCatFulfilled)
      .addCase(updateCat.fulfilled, handleUpdateCatFulfilled)
      .addCase(deleteCat.fulfilled, handleDeleteCatFulfilled);
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
