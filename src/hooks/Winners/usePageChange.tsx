import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "@store/slices/winnersSlice";

const usePageChange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    navigate(newPage === 1 ? "/winners" : `/winners/${newPage}`);
  };

  return handlePageChange;
};

export default usePageChange;
