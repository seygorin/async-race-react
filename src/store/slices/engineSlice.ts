import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startEngine, stopEngine, driveEngine } from "../api/engineApi";

export interface EngineState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  velocities: Record<number, number>;
  distances: Record<number, number>;
}

const initialState: EngineState = {
  status: "idle",
  error: null,
  velocities: {},
  distances: {},
};

const setLoading = (state: EngineState): EngineState => ({
  ...state,
  status: "loading",
});

const setFailed = (state: EngineState, error: string): EngineState => ({
  ...state,
  status: "failed",
  error,
});

const handleStartEngineFulfilled = (
  state: EngineState,
  action: PayloadAction<{
    id: number;
    velocity: number;
    distance: number;
    error?: boolean;
  }>,
): EngineState => ({
  ...state,
  status: "succeeded",
  velocities: {
    ...state.velocities,
    [action.payload.id]: action.payload.velocity,
  },
  distances: {
    ...state.distances,
    [action.payload.id]: action.payload.distance,
  },
});

const handleStartEngineRejected = (
  state: EngineState,
  action: PayloadAction<unknown, string, unknown, { message?: string }>,
): EngineState =>
  setFailed(state, action.error.message || "Failed to start engine");

const handleStopEngineFulfilled = (
  state: EngineState,
  action: PayloadAction<{ id: number; error?: boolean }>,
): EngineState => ({
  ...state,
  status: "succeeded",
  velocities: { ...state.velocities, [action.payload.id]: 0 },
});

const handleStopEngineRejected = (
  state: EngineState,
  action: PayloadAction<unknown, string, unknown, { message?: string }>,
): EngineState =>
  setFailed(state, action.error.message || "Failed to stop engine");

const handleDriveEngineFulfilled = (state: EngineState): EngineState => ({
  ...state,
  status: "succeeded",
});

const handleDriveEngineRejected = (
  state: EngineState,
  action: PayloadAction<unknown, string, unknown, { message?: string }>,
): EngineState =>
  setFailed(state, action.error.message || "Failed to drive engine");

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startEngine.pending, setLoading)
      .addCase(startEngine.fulfilled, handleStartEngineFulfilled)
      .addCase(startEngine.rejected, handleStartEngineRejected)
      .addCase(driveEngine.pending, setLoading)
      .addCase(driveEngine.fulfilled, handleDriveEngineFulfilled)
      .addCase(driveEngine.rejected, handleDriveEngineRejected)
      .addCase(stopEngine.pending, setLoading)
      .addCase(stopEngine.fulfilled, handleStopEngineFulfilled)
      .addCase(stopEngine.rejected, handleStopEngineRejected);
  },
});

export default engineSlice.reducer;
