import { useDispatch } from "react-redux";
import { setPage } from "@store/slices/winnersSlice";
import useStateApp from "@hooks/useStateApp";
import { useNavigate } from "react-router-dom";

const useWinners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { winners, currentPageWinners, itemsPerPageWinners } = useStateApp();

  const totalCount = winners.length;
  const pageCount = Math.ceil(totalCount / itemsPerPageWinners);

  const paginatedWinners = winners.slice(
    (currentPageWinners - 1) * itemsPerPageWinners,
    currentPageWinners * itemsPerPageWinners,
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
    currentPageWinners,
    totalCount,
    pageCount,
    handlePageChange,
  };
};

export default useWinners;
