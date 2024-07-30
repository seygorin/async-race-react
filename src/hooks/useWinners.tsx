import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { setPage } from "@store/slices/winnersSlice";
import { useNavigate } from "react-router-dom";

const useWinners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const winners = useSelector((state: RootState) => state.winners.winners);
  const currentPage = useSelector(
    (state: RootState) => state.winners.currentPage,
  );
  const itemsPerPage = useSelector(
    (state: RootState) => state.winners.itemsPerPage,
  );

  const totalCount = winners.length;
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  const paginatedWinners = winners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    if (newPage === 1) {
      navigate("/winners");
    } else {
      navigate(`/winners/${newPage}`);
    }
  };

  return {
    winners: paginatedWinners,
    currentPage,
    totalCount,
    pageCount,
    handlePageChange,
  };
};

export default useWinners;
