import { useGarage } from "../hooks/useGarage";
import { useCarForm } from "../hooks/useCarForm";
import GarageHeader from "../components/Garage/GarageHeader";
import GarageContent from "../components/Garage/GarageContent";

const CARS_PER_PAGE = 7;

function Garage() {
  const garageProps = useGarage();

  const {
    carName,
    setCarName,
    carColor,
    setCarColor,
    editingCar,
    handleAddOrUpdateCar,
    handleEditCar,
  } = useCarForm(
    garageProps.handleAddCar,
    garageProps.handleUpdateCar,
    garageProps.cars,
  );

  const carFormProps = {
    carName,
    carColor,
    setCarName,
    setCarColor,
    handleAddCar: handleAddOrUpdateCar,
    editingCar,
  };

  const garageContentProps = {
    ...garageProps,
    handleEditCar,
    pageSize: CARS_PER_PAGE,
    onPageChange: garageProps.handlePageChange,
  };

  return (
    <div>
      <GarageHeader carFormProps={carFormProps} />
      <GarageContent {...garageContentProps} />
    </div>
  );
}

export default Garage;
