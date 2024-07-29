import { useDispatch } from "react-redux";
import { setEditingCat } from "@store/slices/catFormSlice";

const useEditCat = (cats) => {
  const dispatch = useDispatch();

  const handleEditCat = (id) => {
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

  return handleEditCat;
};

export default useEditCat;
