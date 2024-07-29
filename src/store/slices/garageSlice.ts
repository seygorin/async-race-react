// store/slices/garageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCats, addCat, updateCat, deleteCat } from "../api/garageApi";

const garageSlice = createSlice({
  name: "garage",
  initialState: {
    cats: [],
    totalCount: 0,
    status: "idle",
    error: null,
    currentPage: 1,
    positions: {},
    winner: null,
    isRacing: {}, // Обновлено
    stoppedCats: [],
    startTime: {},
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setIsRacing: (state, action) => {
      state.isRacing = { ...state.isRacing, ...action.payload }; // Обновлено
    },
    setStoppedCats: (state, action) => {
      state.stoppedCats = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = { ...state.startTime, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cats = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCat.fulfilled, (state, action) => {
        state.cats.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        const index = state.cats.findIndex(
          (cat) => cat.id === action.payload.id,
        );
        if (index !== -1) {
          state.cats[index] = action.payload;
        }
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.cats = state.cats.filter((cat) => cat.id !== action.payload);
        state.totalCount -= 1;
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
