import { createSlice } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface EngineState {
  velocities: Record<number, number>;
  distances: Record<number, number>;
}

const initialState: EngineState = {
  velocities: {},
  distances: {},
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(apiBuilder.endpoints.startEngine.matchFulfilled, (state, action) => {
        const payload = action.payload as {
          id: number;
          velocity: number;
          distance: number;
        };
        const { id, velocity, distance } = payload;
        return {
          ...state,
          velocities: { ...state.velocities, [id]: velocity },
          distances: { ...state.distances, [id]: distance },
        };
      })
      .addMatcher(apiBuilder.endpoints.startEngine.matchRejected, (state) => {
        return { ...state };
      })
      .addMatcher(apiBuilder.endpoints.stopEngine.matchFulfilled, (state, action) => {
        const payload = action.payload as { id: number };
        const { id } = payload;
        return {
          ...state,
          velocities: { ...state.velocities, [id]: 0 },
        };
      })
      .addMatcher(apiBuilder.endpoints.stopEngine.matchRejected, (state) => {
        return { ...state };
      });
  },
});

export default engineSlice.reducer;
