import { useCallback } from "react";
import { Winner } from "@type/winnersTypes";
import { useDeleteWinner } from "./useMutations";

const useWinnerDelete = (
  currentPageWinners: number,
  winners: Winner[],
  handlePageChange: (page: number) => void,
  refetch: () => void,
) => {
  const [deleteWinner] = useDeleteWinner();

  return useCallback(
    async (id: Winner) => {
      await deleteWinner(id);
      if (winners.length === 1 && currentPageWinners > 1) {
        handlePageChange(currentPageWinners - 1);
      } else {
        refetch();
      }
    },
    [deleteWinner, winners.length, currentPageWinners, handlePageChange, refetch],
  );
};

export default useWinnerDelete;
