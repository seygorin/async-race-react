import useCarList from "./useCarList";
import useRace from "./useRace";
import useModal from "./useModal";
import useCarForm from "./useCarForm";

const useGaragePage = () => {
  const carList = useCarList();
  const race = useRace(carList.cars);
  const modal = useModal();
  const carForm = useCarForm(
    carList.handleAddCar,
    carList.handleUpdateCar,
    carList.cars,
  );

  const carFormProps = {
    carName: carForm.carName,
    carColor: carForm.carColor,
    setCarName: carForm.setCarName,
    setCarColor: carForm.setCarColor,
    handleAddCar: carForm.handleAddOrUpdateCar,
    editingCar: carForm.editingCar,
  };

  const garageContentProps = {
    ...carList,
    ...race,
    handleEditCar: carForm.handleEditCar,
    pageSize: 7,
    onPageChange: carList.handlePageChange,
  };

  return {
    isModalVisible: modal.isModalVisible,
    carFormProps,
    garageContentProps,
    handleCloseModal: modal.handleCloseModal,
  };
};

export default useGaragePage;
