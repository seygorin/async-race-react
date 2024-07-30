import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import {
  setCatName,
  setCatColor,
  setEditingCat,
  clearForm,
} from "@store/slices/catFormSlice";
import { Cat as CatType } from "@store/slices/garageSlice";
import useCatList from "@containers/CatListContainer/hook/useCatList";
import useModal from "@containers/WinnerModalContainer/hook/useModal";
import useRace from "./useRace";

interface UseGaragePageResult {
  isModalVisible: boolean;
  catFormProps: {
    catName: string;
    catColor: string;
    setCatName: (name: string) => void;
    setCatColor: (color: string) => void;
    handleAddOrUpdateCat: () => void;
    editingCat: CatType | null;
    handleEditCat: (id: string) => void;
  };
  garageContentProps: {
    cats: CatType[];
    handleAddCat: (cat: Omit<CatType, "id">) => void;
    handleUpdateCat: (id: string, updatedCat: Omit<CatType, "id">) => void;
    handleDeleteCat: (id: number) => void;
    handlePageChange: (page: number) => void;
    isRacing: { [key: string]: boolean };
    positions: { [key: string]: number };
    handleStartRace: () => void;
    handleStopRace: () => void;
    handleEditCat: (id: string) => void;
    onPageChange: (page: number) => void;
  };
  handleCloseModal: () => void;
}

const useGaragePage = (): UseGaragePageResult => {
  const dispatch = useDispatch();
  const catList = useCatList();
  const race = useRace(catList.cats);
  const modal = useModal();
  const { catName, catColor, editingCat } = useSelector(
    (state: RootState) => state.catForm,
  );

  const handleAddOrUpdateCat = () => {
    const newCat = { name: catName, color: catColor };
    if (editingCat) {
      catList.handleUpdateCat(editingCat, newCat);
    } else {
      catList.handleAddCat(newCat);
    }
    dispatch(clearForm());
  };

  const handleEditCat = (id: string) => {
    const catToEdit = catList.cats.find((cat) => cat.id === id);
    if (catToEdit) {
      dispatch(
        setEditingCat({
          id: catToEdit.id,
          name: catToEdit.name,
          color: catToEdit.color,
        }),
      );
    }
  };

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps: {
      catName,
      catColor,
      setCatName: (name: string) => dispatch(setCatName(name)),
      setCatColor: (color: string) => dispatch(setCatColor(color)),
      handleAddOrUpdateCat,
      editingCat,
      handleEditCat,
    },
    garageContentProps: {
      ...catList,
      ...race,
      handleEditCat,

      onPageChange: catList.handlePageChange,
    },
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;
