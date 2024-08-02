import { useDispatch } from "react-redux";
import {
  setCatName,
  setCatColor,
  setEditingCat,
  clearForm,
} from "@store/slices/catFormSlice";
import useCatList from "@hooks/Cats/useCatList";
import useStateApp from "@hooks/useStateApp";
import { AppDispatch } from "@store/store";

const useCatForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { catName, catColor, editingCat } = useStateApp();
  const { handleAddCat, handleUpdateCat, cats } = useCatList();

  const handleAddOrUpdateCat = () => {
    const newCat = { name: catName, color: catColor };
    if (editingCat) {
      handleUpdateCat(editingCat, newCat);
    } else {
      handleAddCat(newCat);
    }
    dispatch(clearForm());
  };

  const handleEditCat = (id: number) => {
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
