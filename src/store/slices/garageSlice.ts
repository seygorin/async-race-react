import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, addCar, updateCar, deleteCar } from "../api/garageApi";

const garageSlice = createSlice({
  name: "garage",
  initialState: {
    cars: [],
    totalCount: 0,
    status: "idle",
    error: null,
    currentPage: 1,
    positions: {},
    winner: null,
    isRacing: false,
    stoppedCars: [],
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
      state.isRacing = action.payload;
    },
    setStoppedCars: (state, action) => {
      state.stoppedCars = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = { ...state.startTime, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(
          (car) => car.id === action.payload.id,
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const {
  setCurrentPage,
  setPositions,
  setWinner,
  setIsRacing,
  setStoppedCars,
  setStartTime,
} = garageSlice.actions;

export default garageSlice.reducer;
