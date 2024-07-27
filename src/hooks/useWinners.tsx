import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/slices/winnersSlice";

const useWinners = () => {
  const dispatch = useDispatch();
  const winners = useSelector((state) => state.winners.winners);
  const currentPage = useSelector((state) => state.winners.currentPage);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return {
    winners,
    currentPage,
    handlePageChange,
  };
};

export default useWinners;
