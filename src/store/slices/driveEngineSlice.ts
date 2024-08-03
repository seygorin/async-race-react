import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface DriveEngineState {
  statuses: Record<string, "idle" | "loading" | "succeeded" | "failed">;
}

const initialState: DriveEngineState = {
  statuses: {},
};

const driveEngineSlice = createSlice({
  name: "driveEngine",
  initialState,
  reducers: {
    setDriveStatus: (
      state,
      action: PayloadAction<
        { id: number; status: "idle" | "loading" | "succeeded" | "failed" } | "reset"
      >,
    ) => {
      if (action.payload === "reset") {
        return {
          ...state,
          statuses: Object.keys(state.statuses).reduce(
            (acc, key) => {
              acc[Number(key)] = "idle";
              return acc;
            },
            {} as Record<number, "idle" | "loading" | "succeeded" | "failed">,
          ),
        };
      }

      const { id, status } = action.payload;
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [id]: status,
        },
      };
    },
  },
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

export const { setDriveStatus } = driveEngineSlice.actions;

const drivenReducer = driveEngineSlice.reducer;
export default drivenReducer;
