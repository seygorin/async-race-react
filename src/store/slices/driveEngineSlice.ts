import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface DriveEngineState {
  statuses: Record<number, "idle" | "loading" | "succeeded" | "failed">;
}

const initialState: DriveEngineState = {
  statuses: {},
};

const handlePendingState = (state: DriveEngineState, id: number) => ({
  ...state,
  statuses: { ...state.statuses, [id]: "loading" },
});

const handleDriveEngineFulfilled = (
  state: DriveEngineState,
  action: PayloadAction<{ id: number }>,
) => {
  const { id } = action.payload;
  return {
    ...state,
    statuses: { ...state.statuses, [id]: "succeeded" },
  };
};

const handleRejectedState = (state: DriveEngineState, id: number) => ({
  ...state,
  statuses: { ...state.statuses, [id]: "failed" },
});

const driveEngineSlice = createSlice({
  name: "driveEngine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiBuilder.endpoints.driveEngine.matchPending,
        (state, action) =>
          handlePendingState(state, Number(action.meta.arg.originalArgs)),
      )
      .addMatcher(
        apiBuilder.endpoints.driveEngine.matchFulfilled,
        handleDriveEngineFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.driveEngine.matchRejected,
        (state, action) =>
          handleRejectedState(state, Number(action.meta.arg.originalArgs)),
      );
  },
});

export default driveEngineSlice.reducer;
