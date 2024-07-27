import { useState } from "react";

const useCarForm = (handleAddCar, handleUpdateCar, cars) => {
  const [carName, setCarName] = useState("");
  const [carColor, setCarColor] = useState("#000");
  const [editingCar, setEditingCar] = useState(null);

  const handleAddOrUpdateCar = () => {
    const newCar = { name: carName, color: carColor };
    if (editingCar !== null) {
      handleUpdateCar(editingCar, newCar);
      setEditingCar(null);
    } else {
      handleAddCar(newCar);
    }
    setCarName("");
    setCarColor("#000");
  };

  const handleEditCar = (id) => {
    const car = cars.find((car) => car.id === id);
    if (car) {
      setEditingCar(id);
      setCarName(car.name);
      setCarColor(car.color);
    }
  };

  return {
    carName,
    setCarName,
    carColor,
    setCarColor,
    editingCar,
    handleAddOrUpdateCar,
    handleEditCar,
  };
};

export default useCarForm;
