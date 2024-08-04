import { useDispatch } from "react-redux";
import { setEditingCat } from "@store/slices/catFormSlice";
import { Cat as CatType } from "@type/catsTypes";

const useEditCat = () => {
  const dispatch = useDispatch();

  const handleEditCat = (cat: CatType) => {
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
