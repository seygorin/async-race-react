import { createSlice } from "@reduxjs/toolkit";
import { startEngine, stopEngine } from "../api/engineApi";

const engineSlice = createSlice({
  name: "engine",
  initialState: {
    status: "idle",
    error: null,
    velocities: {},
    distances: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startEngine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(startEngine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.velocities[action.payload.id] = action.payload.velocity;
        state.distances[action.payload.id] = action.payload.distance;
      })
      .addCase(startEngine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to start engine";
      })
      .addCase(stopEngine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(stopEngine.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.velocities[action.payload.id] = 0;
      })
      .addCase(stopEngine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to stop engine";
      });
  },
});

export default engineSlice.reducer;
