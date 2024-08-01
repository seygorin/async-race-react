import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@store/slices/garageSlice";
import { generateRandomCats } from "@utils/catGenerator";
import {
  useGetCatsQuery,
  useAddCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} from "@store/api/catsApi";

const CATS_PER_PAGE = 7;
const CHUNK_OF_CATS = 100;

const useCatList = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.garage);

  const {
    data: responseData,
    error,
    isLoading,
  } = useGetCatsQuery({
    page: currentPage,
    limit: CATS_PER_PAGE,
  });

  const cats = responseData?.data || [];
  const totalCount = responseData?.totalCount || 0;

  const [addCatMutation] = useAddCatMutation();
  const [updateCatMutation] = useUpdateCatMutation();
  const [deleteCatMutation] = useDeleteCatMutation();

  const handleAddCat = useCallback(
    async (newCat) => {
      await addCatMutation(newCat);
    },
    [addCatMutation],
  );

  const handleUpdateCat = useCallback(
    async (id, updatedCat) => {
      await updateCatMutation({ id, ...updatedCat });
    },
    [updateCatMutation],
  );

  const handleDeleteCat = useCallback(
    async (id) => {
      await deleteCatMutation(id);
      const newTotalCount = totalCount - 1;
      const totalPages = Math.ceil(newTotalCount / CATS_PER_PAGE);

      if (cats.length === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      } else if (currentPage > totalPages) {
        dispatch(setCurrentPage(totalPages));
      }
    },
    [deleteCatMutation, dispatch, currentPage, totalCount, cats],
  );

  return {
    cats,
    totalCount,
    currentPage,
    isLoading,
    error,
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
    },
    [dispatch],
  );

  return { handlePageChange };
};

const useGenerateRandomCats = () => {
  const [addCatMutation] = useAddCatMutation();

  const handleGenerateRandomCats = useCallback(async () => {
    const randomCats = generateRandomCats(CHUNK_OF_CATS);

    await Promise.all(randomCats.map((cat) => addCatMutation(cat)));
  }, [addCatMutation]);

  return { handleGenerateRandomCats };
};

export { useCatList, usePageChange, useGenerateRandomCats };
