import { createSlice } from "@reduxjs/toolkit";

const winnersSlice = createSlice({
  name: "winners",
  initialState: {
    winners: [],
    currentPage: 1,
  },
  reducers: {
    addWinner: (state, action) => {
      const { id, name, bestTime } = action.payload;
      const existingWinner = state.winners.find((winner) => winner.id === id);

      if (existingWinner) {
        existingWinner.wins += 1;
        if (bestTime < existingWinner.bestTime) {
          existingWinner.bestTime = bestTime;
        }
      } else {
        state.winners.push({ id, name, wins: 1, bestTime });
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addWinner, setPage } = winnersSlice.actions;

export default winnersSlice.reducer;
