import { useSelector, useDispatch } from "react-redux";
import useStateApp from "@hooks/useStateApp";
import { RootState } from "@store/store";
import { setSort } from "@store/slices/winnersSlice";
import useWinnersQuery from "./useWinnersQuery";
import usePageChange from "./usePageChange";
import useWinnerUpdate from "./useWinnerUpdate";
import useWinnerDelete from "./useWinnerDelete";

const useWinners = () => {
  const dispatch = useDispatch();
  const { currentPageWinners, itemsPerPageWinners, sortField, sortOrder } = useStateApp();
  const winners = useSelector((state: RootState) => state.winners.winners);

  const { data, refetch, isLoading, isFetching } = useWinnersQuery();

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

  const handleSort = (field: "id" | "wins" | "time", order: "ASC" | "DESC") => {
    dispatch(setSort({ field, order }));
  };

  return {
    winners,
    currentPageWinners,
    totalCount,
    pageCount,
    isLoading,
    isFetching,
    sortField,
    sortOrder,
    handlePageChange,
    handleWinnerUpdate,
    handleDeleteWinner,
    handleSort,
  };
};

export default useWinners;
