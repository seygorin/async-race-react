import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@store/slices/garageSlice";
import {
  useGetCatsQuery,
  useAddCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
  useDeleteWinnerMutation,
} from "@store/api/apiBuilder";
import { AppDispatch } from "@store/store";
import useStateApp from "@hooks/useStateApp";
import { Cat } from "@type/catsTypes";
import mockData from "../../mocks/index";

const CATS_PER_PAGE = 7;

interface UseCatListResult {
  cats: Cat[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
}

const useCatData = (): UseCatListResult => {
  const { currentPage } = useStateApp();

  const {
    data: responseData,
    isLoading,
    error,
  } = useGetCatsQuery({
    page: currentPage,
    limit: CATS_PER_PAGE,
  });

  const cats = useMemo(() => {
    if (error) {
      const start = (currentPage - 1) * CATS_PER_PAGE;
      const end = start + CATS_PER_PAGE;
      return mockData.cats.slice(start, end);
    }
    return responseData?.data || [];
  }, [responseData, error, currentPage]);

  const totalCount = useMemo(() => {
    if (error) {
      return mockData.totalCount;
    }
    return responseData?.totalCount || 0;
  }, [responseData, error]);

  return {
    cats,
    totalCount,
    currentPage,
    isLoading,
  };
};

interface UseCatMutationsResult {
  handleAddCat: (newCat: Omit<Cat, "id">) => Promise<void>;
  handleUpdateCat: (id: number, updatedCat: Partial<Cat>) => Promise<void>;
  handleDeleteCat: (id: number) => Promise<void>;
}

const useAddCat = () => {
  const [addCatMutation] = useAddCatMutation();

  const handleAddCat = useCallback(
    async (newCat: Omit<Cat, "id">) => {
      await addCatMutation(newCat);
    },
    [addCatMutation],
  );

  return handleAddCat;
};

const useUpdateCat = () => {
  const [updateCatMutation] = useUpdateCatMutation();

  const handleUpdateCat = useCallback(
    async (id: number, updatedCat: Partial<Cat>) => {
      await updateCatMutation({ id, ...updatedCat });
    },
    [updateCatMutation],
  );

  return handleUpdateCat;
};

const useDeleteCat = (currentPage: number, totalCount: number, catsLength: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteCatMutation] = useDeleteCatMutation();
  const [deleteWinnerMutation] = useDeleteWinnerMutation();
  const { winners } = useStateApp();
  const handleDeleteCat = useCallback(
    async (id: number) => {
      await deleteCatMutation(id);

      const winnerToDelete = winners.find((winner) => winner.id === id);
      if (winnerToDelete) {
        await deleteWinnerMutation({ id });
      }

      const newTotalCount = totalCount - 1;
      const totalPages = Math.ceil(newTotalCount / CATS_PER_PAGE);

      if (catsLength === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      } else if (currentPage > totalPages) {
        dispatch(setCurrentPage(totalPages));
      }
    },
    [
      deleteCatMutation,
      deleteWinnerMutation,
      dispatch,
      currentPage,
      totalCount,
      catsLength,
      winners,
    ],
  );

  return handleDeleteCat;
};

const useCatMutations = (currentPage: number, totalCount: number, catsLength: number) => {
  const handleAddCat = useAddCat();
  const handleUpdateCat = useUpdateCat();
  const handleDeleteCat = useDeleteCat(currentPage, totalCount, catsLength);

  return {
    handleAddCat,
    handleUpdateCat,
    handleDeleteCat,
  };
};

const useCatList = (): UseCatListResult & UseCatMutationsResult => {
  const catData = useCatData();
  const catMutations = useCatMutations(
    catData.currentPage,
    catData.totalCount,
    catData.cats.length,
  );

  return {
    ...catData,
    ...catMutations,
  };
};

export default useCatList;
