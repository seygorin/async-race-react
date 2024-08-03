import { useState } from "react";

import CatForm from "@components/Cat/CatForm";
import useCatForm from "@hooks/Cats/useCatForm";

function CatFormContainer() {
  const { catName, catColor, setCatName, setCatColor, handleAddOrUpdateCat, editingCat } =
    useCatForm();

  const [isNameValid, setIsNameValid] = useState(true);

  const handleFormSubmit = () => {
    if (isNameValid) {
      handleAddOrUpdateCat();
    }
  };

  return (
    <CatForm
      catName={catName}
      catColor={catColor}
      setCatName={setCatName}
      setCatColor={setCatColor}
      editingCat={editingCat}
      isNameValid={isNameValid}
      setIsNameValid={setIsNameValid}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default CatFormContainer;
