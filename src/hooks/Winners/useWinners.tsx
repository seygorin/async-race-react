import { useSelector } from "react-redux";
import useStateApp from "@hooks/useStateApp";
import { RootState } from "@store/store";
import useWinnersQuery from "./useWinnersQuery";
import usePageChange from "./usePageChange";
import useWinnerUpdate from "./useWinnerUpdate";
import useWinnerDelete from "./useWinnerDelete";

const useWinners = () => {
  const { currentPageWinners, itemsPerPageWinners } = useStateApp();
  const winners = useSelector((state: RootState) => state.winners.winners);

  const { data, refetch } = useWinnersQuery();

  const totalCount = data?.totalCount || 0;
  const pageCount = Math.ceil(totalCount / itemsPerPageWinners);

  const handlePageChange = usePageChange();
  const handleWinnerUpdate = useWinnerUpdate(refetch);
  const handleDeleteWinner = useWinnerDelete(
    currentPageWinners,
    winners,
    handlePageChange,
    refetch,
  );

  return {
    winners,
    currentPageWinners,
    totalCount,
    pageCount,
    handlePageChange,
    handleWinnerUpdate,
    handleDeleteWinner,
  };
};

export default useWinners;
