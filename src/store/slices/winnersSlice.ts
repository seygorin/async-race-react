import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Winner {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface WinnersState {
  winners: Winner[];
  currentPage: number;
  itemsPerPage: number;
}

const initialState: WinnersState = {
  winners: [],
  currentPage: 1,
  itemsPerPage: 10,
};

const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    addWinner: (
      state,
      action: PayloadAction<Omit<Winner, "wins"> & { bestTime: number }>,
    ) => {
      const { id, name, color, bestTime } = action.payload;
      const roundedBestTime = Number(bestTime.toFixed(1));

      const existingWinner = state.winners.find((winner) => winner.id === id);

      if (existingWinner) {
        existingWinner.wins += 1;
        if (roundedBestTime < existingWinner.bestTime) {
          existingWinner.bestTime = roundedBestTime;
        }
      } else {
        state.winners.push({
          id,
          name,
          color,
          wins: 1,
          bestTime: roundedBestTime,
        });
      }
    },
    removeWinner: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        winners: state.winners.filter((winner) => winner.id !== action.payload),
      };
    },
    setPage: (state, action: PayloadAction<number>) => {
      return { ...state, currentPage: action.payload };
    },
  },
});

export const { addWinner, removeWinner, setPage } = winnersSlice.actions;

export default winnersSlice.reducer;
