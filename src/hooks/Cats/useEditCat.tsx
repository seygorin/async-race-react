import { useDispatch } from "react-redux";
import { setEditingCat } from "@store/slices/catFormSlice";

const useEditCat = () => {
  const dispatch = useDispatch();

  const handleEditCat = (cat) => {
    dispatch(
      setEditingCat({
        id: cat.id,
        name: cat.name,
        color: cat.color,
      }),
    );
  };

  return handleEditCat;
};

export default useEditCat;
