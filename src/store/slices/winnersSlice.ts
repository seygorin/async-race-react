import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiBuilder } from "../api/apiBuilder";

export interface Winner {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface WinnersState {
  winners: Winner[];
  currentPageWinners: number;
  itemsPerPageWinners: number;
  error: string | null;
}

const initialState: WinnersState = {
  winners: [],
  currentPageWinners: 1,
  itemsPerPageWinners: 10,
  error: null,
};

const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPageWinners = action.payload;
    },
    updateWinnerLocally: (state, action: PayloadAction<Winner>) => {
      const index = state.winners.findIndex(
        (winner) => winner.id === action.payload.id,
      );
      if (index !== -1) {
        state.winners[index] = {
          ...state.winners[index],
          wins: action.payload.wins,
          bestTime: Math.min(
            state.winners[index].bestTime,
            action.payload.bestTime,
          ),
        };
      } else {
        state.winners.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiBuilder.endpoints.getWinners.matchFulfilled,
        (state, action) => {
          state.winners = action.payload.winners;
        },
      )
      .addMatcher(
        apiBuilder.endpoints.createWinner.matchFulfilled,
        (state, action) => {
          state.winners.push(action.payload);
        },
      )
      .addMatcher(
        apiBuilder.endpoints.updateWinner.matchFulfilled,
        (state, action) => {
          const index = state.winners.findIndex(
            (winner) => winner.id === action.payload.id,
          );
          if (index !== -1) {
            state.winners[index] = action.payload;
          }
        },
      )
      .addMatcher(
        apiBuilder.endpoints.deleteWinner.matchFulfilled,
        (state, action) => {
          state.winners = state.winners.filter(
            (winner) => winner.id !== action.payload,
          );
        },
      );
  },
});

export const { setPage, updateWinnerLocally } = winnersSlice.actions;

export default winnersSlice.reducer;
