import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import {
  setCatName,
  setCatColor,
  setEditingCat,
  clearForm,
} from "@store/slices/catFormSlice";

import { useCatList } from "@containers/CatListContainer/hook/useCatList";

const useCatForm = () => {
  const dispatch = useDispatch();
  const { catName, catColor, editingCat } = useSelector(
    (state: RootState) => state.catForm,
  );
  const { handleAddCat, handleUpdateCat, cats } = useCatList();

  const handleAddOrUpdateCat = () => {
    const newCat = { name: catName, color: catColor };
    if (editingCat) {
      handleUpdateCat(editingCat.id, newCat);
    } else {
      handleAddCat(newCat);
    }
    dispatch(clearForm());
  };

  const handleEditCat = (id: string) => {
    const catToEdit = cats.find((cat) => cat.id === id);
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
    catName,
    catColor,
    setCatName: (name: string) => dispatch(setCatName(name)),
    setCatColor: (color: string) => dispatch(setCatColor(color)),
    handleAddOrUpdateCat,
    editingCat,
    handleEditCat,
  };
};

export default useCatForm;
