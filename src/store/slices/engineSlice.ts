import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { engineApi } from "../api/engineApi";

export interface EngineState {
  statuses: Record<number, "idle" | "loading" | "succeeded" | "failed">;
  velocities: Record<number, number>;
  distances: Record<number, number>;
  results: Record<
    number,
    { error?: boolean; errorMessage?: string; stopped?: boolean }
  >;
}

const initialState: EngineState = {
  statuses: {},
  velocities: {},
  distances: {},
  results: {},
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        engineApi.endpoints.startEngine.matchPending,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          state.statuses[id] = "loading";
        },
      )
      .addMatcher(
        engineApi.endpoints.startEngine.matchFulfilled,
        (state, action) => {
          const { id, velocity, distance } = action.payload;
          state.velocities[id] = velocity;
          state.distances[id] = distance;
          state.results[id] = { error: false, stopped: false };
        },
      )
      .addMatcher(
        engineApi.endpoints.startEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          const errorData = action.payload?.data || action.error;
          state.statuses[id] = "failed";
          state.results[id] = {
            error: true,
            stopped: true,
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchPending,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          state.statuses[id] = "loading";
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchFulfilled,
        (state, action) => {
          const { id } = action.payload;

          state.velocities[id] = 0;
          state.results[id] = { ...state.results[id], stopped: true };
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          const errorData = action.payload?.data || action.error;
          state.statuses[id] = "failed";
          state.results[id] = {
            error: true,
            stopped: true,
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchPending,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          state.statuses[id] = "loading";
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchFulfilled,
        (state, action) => {
          const { id } = action.payload;
          state.statuses[id] = "succeeded";
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          const errorData = action.payload?.data || action.error;
          state.statuses[id] = "failed";
          state.results[id] = {
            error: true,
            stopped: true,
          };
        },
      );
  },
});

export default engineSlice.reducer;
