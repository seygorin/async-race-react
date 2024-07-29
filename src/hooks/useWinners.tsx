import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { setPage } from "@store/slices/winnersSlice";

const useWinners = () => {
  const dispatch = useDispatch();
  const winners = useSelector((state: RootState) => state.winners.winners);
  const currentPage = useSelector(
    (state: RootState) => state.winners.currentPage,
  );

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return {
    winners,
    currentPage,
    handlePageChange,
  };
};

export default useWinners;
