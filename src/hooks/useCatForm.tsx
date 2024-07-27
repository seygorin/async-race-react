import { useState } from "react";

const useCatForm = (handleAddCat, handleUpdateCat, cats) => {
  const [catName, setCatName] = useState("");
  const [catColor, setCatColor] = useState("#000");

  const [editingCat, setEditingCat] = useState(null);

  const handleAddOrUpdateCat = () => {
    const newCat = { name: catName, color: catColor };
    if (editingCat !== null) {
      handleUpdateCat(editingCat, newCat);
      setEditingCat(null);
    } else {
      handleAddCat(newCat);
    }
    setCatName("");
    setCatColor("#000");
  };

  const handleEditCat = (id) => {
    const cat = cats.find((cat) => cat.id === id);
    if (cat) {
      setEditingCat(id);
      setCatName(cat.name);
      setCatColor(cat.color);
    }
  };

  return {
    catName,
    setCatName,
    catColor,
    setCatColor,
    editingCat,
    handleAddOrUpdateCat,
    handleEditCat,
  };
};

export default useCatForm;
