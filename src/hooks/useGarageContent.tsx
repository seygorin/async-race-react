import {
  useCatList,
  usePageChange,
  useGenerateRandomCats,
} from "@containers/CatListContainer/hook/useCatList";
import useRace from "./useRace";

const useGarageContent = () => {
  const {
    cats,
    totalCount,
    currentPage,
    handleAddCat,
    handleUpdateCat,
    handleDeleteCat,
  } = useCatList();
  const { handlePageChange } = usePageChange();
  const { handleGenerateRandomCats } = useGenerateRandomCats();
  const race = useRace(cats);

  return {
    cats,
    totalCount,
    currentPage,
    handleAddCat,
    handleUpdateCat,
    handleDeleteCat,
    handlePageChange,
    handleGenerateRandomCats,
    ...race,
  };
};

export default useGarageContent;
