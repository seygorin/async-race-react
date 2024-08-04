import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWinnerLocally } from "@store/slices/winnersSlice";
import { RootState } from "@store/store";
import { Winner } from "@type/winnersTypes";
import { useUpdateWinner, useCreateWinner } from "./useMutations";

const useWinnerUpdate = (refetch: () => void) => {
  const dispatch = useDispatch();
  const winners = useSelector((state: RootState) => state.winners.winners);
  const [updateWinner] = useUpdateWinner();
  const [createWinner] = useCreateWinner();

  return useCallback(
    async (winnerData: Winner) => {
      const existingWinner = winners.find((w) => w.id === winnerData.id);
      if (existingWinner) {
        const updatedWinner = {
          ...existingWinner,
          wins: existingWinner.wins + 1,
          bestTime: Math.min(existingWinner.bestTime, winnerData.bestTime),
        };
        await updateWinner(updatedWinner);
        dispatch(updateWinnerLocally(updatedWinner));
      } else {
        await createWinner(winnerData);
        dispatch(updateWinnerLocally(winnerData));
      }
      refetch();
    },
    [winners, updateWinner, createWinner, dispatch, refetch],
  );
};

export default useWinnerUpdate;
