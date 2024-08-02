import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@store/slices/garageSlice";
import {
  useGetCatsQuery,
  useAddCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} from "@store/api/apiBuilder";
import { AppDispatch } from "@store/store";
import useStateApp from "@hooks/useStateApp";

const CATS_PER_PAGE = 7;

interface Cat {
  id: number;
  name: string;
  color: string;
}

interface UseCatListResult {
  cats: Cat[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
  error: any;
  handleAddCat: (newCat: Omit<Cat, "id">) => Promise<void>;
  handleUpdateCat: (id: number, updatedCat: Partial<Cat>) => Promise<void>;
  handleDeleteCat: (id: number) => Promise<void>;
}

const getCatData = () => {
  const { currentPage } = useStateApp();

  const {
    data: responseData,
    error,
    isLoading,
  } = useGetCatsQuery({
    page: currentPage,
    limit: CATS_PER_PAGE,
  });

  const cats = useMemo(() => responseData?.data || [], [responseData]);
  const totalCount = useMemo(
    () => responseData?.totalCount || 0,
    [responseData],
  );

  return {
    cats,
    totalCount,
    currentPage,
    isLoading,
    error,
  };
};

const createAddCat = () => {
  const [addCatMutation] = useAddCatMutation();

  return useCallback(
    async (newCat: Omit<Cat, "id">) => {
      await addCatMutation(newCat);
    },
    [addCatMutation],
  );
};

const createUpdateCat = () => {
  const [updateCatMutation] = useUpdateCatMutation();

  return useCallback(
    async (id: number, updatedCat: Partial<Cat>) => {
      await updateCatMutation({ id, ...updatedCat });
    },
    [updateCatMutation],
  );
};

const createDeleteCat = (
  currentPage: number,
  totalCount: number,
  catsLength: number,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteCatMutation] = useDeleteCatMutation();

  return useCallback(
    async (id: number) => {
      await deleteCatMutation(id);
      const newTotalCount = totalCount - 1;
      const totalPages = Math.ceil(newTotalCount / CATS_PER_PAGE);

      if (catsLength === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      } else if (currentPage > totalPages) {
        dispatch(setCurrentPage(totalPages));
      }
    },
    [deleteCatMutation, dispatch, currentPage, totalCount, catsLength],
  );
};

const createCatMutations = (
  currentPage: number,
  totalCount: number,
  catsLength: number,
) => {
  const handleAddCat = createAddCat();
  const handleUpdateCat = createUpdateCat();
  const handleDeleteCat = createDeleteCat(currentPage, totalCount, catsLength);

  return {
    handleAddCat,
    handleUpdateCat,
    handleDeleteCat,
  };
};

const useCatList = (): UseCatListResult => {
  const catData = getCatData();
  const catMutations = createCatMutations(
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
