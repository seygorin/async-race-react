import { createSlice } from "@reduxjs/toolkit";
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
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "loading" },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.startEngine.matchFulfilled,
        (state, action) => {
          const { id, velocity, distance } = action.payload;
          return {
            ...state,
            velocities: { ...state.velocities, [id]: velocity },
            distances: { ...state.distances, [id]: distance },
            results: {
              ...state.results,
              [id]: { error: false, stopped: false },
            },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.startEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "failed" },
            results: { ...state.results, [id]: { error: true, stopped: true } },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchPending,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "loading" },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchFulfilled,
        (state, action) => {
          const { id } = action.payload;
          return {
            ...state,
            velocities: { ...state.velocities, [id]: 0 },
            results: {
              ...state.results,
              [id]: { ...state.results[id], stopped: true },
            },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.stopEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "failed" },
            results: { ...state.results, [id]: { error: true, stopped: true } },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchPending,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "loading" },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchFulfilled,
        (state, action) => {
          const { id } = action.payload;
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "succeeded" },
          };
        },
      )
      .addMatcher(
        engineApi.endpoints.driveEngine.matchRejected,
        (state, action) => {
          const id = Number(action.meta.arg.originalArgs);
          return {
            ...state,
            statuses: { ...state.statuses, [id]: "failed" },
            results: { ...state.results, [id]: { error: true, stopped: true } },
          };
        },
      );
  },
});

export default engineSlice.reducer;
