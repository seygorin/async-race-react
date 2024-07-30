import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats, addCat, updateCat, deleteCat } from "@store/api/garageApi";
import { setCurrentPage } from "@store/slices/garageSlice";
import { generateRandomCats } from "@utils/catGenerator";

const CARS_PER_PAGE = 7;
const CHUCNK_OF_CATS = 100;

const useCatList = () => {
  const dispatch = useDispatch();
  const { cats, totalCount, currentPage } = useSelector(
    (state) => state.garage,
  );

  useEffect(() => {
    dispatch(fetchCats({ _page: currentPage, _limit: CARS_PER_PAGE }));
  }, [dispatch, currentPage]);

  const handleAddCat = useCallback(
    (newCat) => {
      dispatch(addCat(newCat));
    },
    [dispatch],
  );

  const handleUpdateCat = useCallback(
    (id, updatedCat) => {
      dispatch(updateCat({ id, updatedCat }));
    },
    [dispatch],
  );

  const handleDeleteCat = useCallback(
    (id) => {
      dispatch(deleteCat(id));
    },
    [dispatch],
  );

  return {
    cats,
    totalCount,
    currentPage,
    handleAddCat,
    handleUpdateCat,
    handleDeleteCat,
  };
};

const usePageChange = () => {
  const dispatch = useDispatch();

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchCats({ _page: page, _limit: CARS_PER_PAGE }));
    },
    [dispatch],
  );

  return { handlePageChange };
};

const useGenerateRandomCats = () => {
  const dispatch = useDispatch();

  const handleGenerateRandomCats = useCallback(() => {
    const randomCats = generateRandomCats(CHUCNK_OF_CATS);
    randomCats.forEach((cat) => {
      dispatch(addCat(cat));
    });
  }, [dispatch]);

  return { handleGenerateRandomCats };
};

export { useCatList, usePageChange, useGenerateRandomCats };
