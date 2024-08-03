import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface DriveEngineState {
  statuses: Record<number, "idle" | "loading" | "succeeded" | "failed">;
}

const initialState: DriveEngineState = {
  statuses: {},
};

const driveEngineSlice = createSlice({
  name: "driveEngine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(apiBuilder.endpoints.driveEngine.matchPending, (state, action) => {
        const id = Number(action.meta.arg.originalArgs);
        return {
          ...state,
          statuses: {
            ...state.statuses,
            [id]: "loading",
          },
        };
      })
      .addMatcher(
        apiBuilder.endpoints.driveEngine.matchFulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          const { id } = action.payload;
          return {
            ...state,
            statuses: {
              ...state.statuses,
              [id]: "succeeded",
            },
          };
        },
      )
      .addMatcher(apiBuilder.endpoints.driveEngine.matchRejected, (state, action) => {
        const id = Number(action.meta.arg.originalArgs);
        return {
          ...state,
          statuses: {
            ...state.statuses,
            [id]: "failed",
          },
        };
      });
  },
});

export default driveEngineSlice.reducer;
