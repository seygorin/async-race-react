import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteWinnerParams, Winner } from "@type/winnersTypes";
import { apiBuilder } from "../api/apiBuilder";

type DeleteWinnerResult = PayloadAction<
  void,
  string,
  {
    arg: { originalArgs: DeleteWinnerParams };
    requestId: string;
    requestStatus: "fulfilled";
  } & {
    fulfilledTimeStamp: number;
    baseQueryMeta: unknown;
  }
>;

export interface WinnersState {
  winners: Winner[];
  currentPageWinners: number;
  itemsPerPageWinners: number;
  sortField: "id" | "wins" | "time";
  sortOrder: "ASC" | "DESC";
  error: string | null;
}

const initialState: WinnersState = {
  winners: [],
  currentPageWinners: 1,
  itemsPerPageWinners: 10,
  sortField: "id",
  sortOrder: "ASC",
  error: null,
};

const handleGetWinnersFulfilled = (
  state: WinnersState,
  action: PayloadAction<{ winners: Winner[] }>,
) => ({
  ...state,
  winners: action.payload.winners,
});

const handleCreateWinnerFulfilled = (
  state: WinnersState,
  action: PayloadAction<Winner>,
) => ({
  ...state,
  winners: [...state.winners, action.payload],
});

const handleUpdateWinnerFulfilled = (
  state: WinnersState,
  action: PayloadAction<Winner>,
) => {
  const index = state.winners.findIndex((winner) => winner.id === action.payload.id);
  if (index !== -1) {
    return {
      ...state,
      winners: state.winners.map((winner, i) => (i === index ? action.payload : winner)),
    };
  }
  return state;
};

const handleDeleteWinnerFulfilled = (
  state: WinnersState,
  action: DeleteWinnerResult,
) => ({
  ...state,
  winners: state.winners.filter(
    (winner) => winner.id !== action.meta.arg.originalArgs.id,
  ),
});

const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPageWinners: action.payload,
    }),
    setSort: (
      state,
      action: PayloadAction<{ field: "id" | "wins" | "time"; order: "ASC" | "DESC" }>,
    ) => ({
      ...state,
      sortField: action.payload.field,
      sortOrder: action.payload.order,
    }),
    updateWinnerLocally: (state, action: PayloadAction<Winner>) => {
      const index = state.winners.findIndex((winner) => winner.id === action.payload.id);
      if (index !== -1) {
        return {
          ...state,
          winners: state.winners.map((winner, i) =>
            i === index
              ? {
                  ...winner,
                  wins: action.payload.wins,
                  bestTime: Math.min(winner.bestTime, action.payload.bestTime),
                }
              : winner,
          ),
        };
      }
      return {
        ...state,
        winners: [...state.winners, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiBuilder.endpoints.getWinners.matchFulfilled,
        handleGetWinnersFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.createWinner.matchFulfilled,
        handleCreateWinnerFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.updateWinner.matchFulfilled,
        handleUpdateWinnerFulfilled,
      )
      .addMatcher(
        apiBuilder.endpoints.deleteWinner.matchFulfilled,
        handleDeleteWinnerFulfilled,
      );
  },
});

export const { setPage, updateWinnerLocally, setSort } = winnersSlice.actions;

export default winnersSlice.reducer;
