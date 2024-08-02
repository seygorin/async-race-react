import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface EngineState {
  velocities: Record<number, number>;
  distances: Record<number, number>;
}

const initialState: EngineState = {
  velocities: {},
  distances: {},
};

const handleStartEngineFulfilled = (
  state: EngineState,
  action: PayloadAction<{ id: number; velocity: number; distance: number }>,
) => {
  const { id, velocity, distance } = action.payload;
  return {
    ...state,
    velocities: { ...state.velocities, [id]: velocity },
    distances: { ...state.distances, [id]: distance },
  };
};

const handleRejectedState = (state: EngineState) => ({
  ...state,
});

const handleStopEngineFulfilled = (
  state: EngineState,
  action: PayloadAction<{ id: number }>,
) => {
  const { id } = action.payload;
  return {
    ...state,
    velocities: { ...state.velocities, [id]: 0 },
  };
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiBuilder.endpoints.startEngine.matchFulfilled,
        handleStartEngineFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.startEngine.matchRejected,
        (state, action) =>
          handleRejectedState(state, Number(action.meta.arg.originalArgs)),
      )
      .addMatcher(
        apiBuilder.endpoints.stopEngine.matchFulfilled,
        handleStopEngineFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.stopEngine.matchRejected,
        (state, action) =>
          handleRejectedState(state, Number(action.meta.arg.originalArgs)),
      );
  },
});

export default engineSlice.reducer;
