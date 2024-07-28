import useCatList from "@containers/CatListContainer/hook/useCatList";
import useModal from "@containers/WinnerModalContainer/hook/useModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setCatName,
  setCatColor,
  setEditingCat,
  clearForm,
} from "@store/slices/catFormSlice";
import useRace from "./useRace";

const useGaragePage = () => {
  const dispatch = useDispatch();
  const catList = useCatList();
  const race = useRace(catList.cats);
  const modal = useModal();
  const { catName, catColor, editingCat } = useSelector(
    (state) => state.catForm,
  );

  const handleAddOrUpdateCat = () => {
    const newCat = { name: catName, color: catColor };
    if (editingCat !== null) {
      catList.handleUpdateCat(editingCat, newCat);
    } else {
      catList.handleAddCat(newCat);
    }
    dispatch(clearForm());
  };

  const handleEditCat = (id) => {
    const cat = catList.cats.find((cat) => cat.id === id);
    if (cat) {
      dispatch(setEditingCat({ id: cat.id, name: cat.name, color: cat.color }));
    }
  };

  const catFormProps = {
    catName,
    catColor,
    setCatName: (name) => dispatch(setCatName(name)),
    setCatColor: (color) => dispatch(setCatColor(color)),
    handleAddOrUpdateCat,
    editingCat,
    handleEditCat,
  };

  const garageContentProps = {
    ...catList,
    ...race,
    handleEditCat,
    pageSize: 7,
    onPageChange: catList.handlePageChange,
  };

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps,
    garageContentProps,
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;
