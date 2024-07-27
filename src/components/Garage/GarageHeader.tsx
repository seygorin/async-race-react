import CarForm from "../Car/CarForm";
import CarControls from "../Car/CarControls";
import Title from "../Title/Title";

import useGaragePage from "../../hooks/useGaragePage";

function GarageHeader() {
  const { carFormProps, garageContentProps, handleCloseModal } =
    useGaragePage();

  return (
    <>
      <Title text="Garage" />
      <CarForm {...carFormProps} />
      <CarControls {...garageContentProps} />
    </>
  );
}

export default GarageHeader;
