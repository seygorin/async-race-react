import { useState } from "react";
import useGaragePage from "@hooks/useGaragePage";
import CatForm from "@components/Cat/CatForm";

function CatFormContainer() {
  const { catFormProps } = useGaragePage();
  const { handleAddOrUpdateCat } = catFormProps;

  const [isNameValid, setIsNameValid] = useState(true);

  const handleFormSubmit = () => {
    if (isNameValid) {
      handleAddOrUpdateCat();
    }
  };

  return (
    <CatForm
      catFormProps={catFormProps}
      isNameValid={isNameValid}
      setIsNameValid={setIsNameValid}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default CatFormContainer;
