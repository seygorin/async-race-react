import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@store/slices/garageSlice";
import { AppDispatch } from "@store/store";

const usePageChange = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch],
  );

  return { handlePageChange };
};

export default usePageChange;
