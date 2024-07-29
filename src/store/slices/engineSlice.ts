import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startEngine, stopEngine } from "../api/engineApi";

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

const setLoading = (state: EngineState) => ({ ...state, status: "loading" });
const setFailed = (state: EngineState, error: string) => ({
  ...state,
  status: "failed",
  error,
});

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startEngine.pending, setLoading)
      .addCase(
        startEngine.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: number;
            velocity: number;
            distance: number;
          }>,
        ) => ({
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
        }),
      )
      .addCase(startEngine.rejected, (state, action) =>
        setFailed(state, action.error.message || "Failed to start engine"),
      )
      .addCase(stopEngine.pending, setLoading)
      .addCase(
        stopEngine.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => ({
          ...state,
          status: "succeeded",
          velocities: { ...state.velocities, [action.payload.id]: 0 },
        }),
      )
      .addCase(stopEngine.rejected, (state, action) =>
        setFailed(state, action.error.message || "Failed to stop engine"),
      );
  },
});

export default engineSlice.reducer;
