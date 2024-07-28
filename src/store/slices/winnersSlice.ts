import { createSlice } from "@reduxjs/toolkit";

const winnersSlice = createSlice({
  name: "winners",
  initialState: {
    winners: [],
    currentPage: 1,
  },
  reducers: {
    addWinner: (state, action) => {
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
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addWinner, setPage } = winnersSlice.actions;

export default winnersSlice.reducer;
