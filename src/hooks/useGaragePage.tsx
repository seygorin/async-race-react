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
    editingCat
      ? catList.handleUpdateCat(editingCat, newCat)
      : catList.handleAddCat(newCat);
    dispatch(clearForm());
  };

  const handleEditCat = (id) => {
    const cat = catList.cats.find((cat) => cat.id === id);
    if (cat)
      dispatch(setEditingCat({ id: cat.id, name: cat.name, color: cat.color }));
  };

  return {
    isModalVisible: modal.isModalVisible,
    catFormProps: {
      catName,
      catColor,
      setCatName: (name) => dispatch(setCatName(name)),
      setCatColor: (color) => dispatch(setCatColor(color)),
      handleAddOrUpdateCat,
      editingCat,
      handleEditCat,
    },
    garageContentProps: {
      ...catList,
      ...race,
      handleEditCat,
      pageSize: 7,
      onPageChange: catList.handlePageChange,
    },
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;
