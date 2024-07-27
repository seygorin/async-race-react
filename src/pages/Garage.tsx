import React from "react";
import useGaragePage from "../hooks/useGaragePage";
import WinnerModal from "../components/Winners/WinnerModal";
import GarageHeader from "../components/Garage/GarageHeader";
import GarageContent from "../components/Garage/GarageContent";

function Garage() {
  const { isModalVisible, carFormProps, garageContentProps, handleCloseModal } =
    useGaragePage();

  return (
    <div>
      <GarageHeader carFormProps={carFormProps} />
      <GarageContent {...garageContentProps} />
      <WinnerModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
}

export default Garage;
