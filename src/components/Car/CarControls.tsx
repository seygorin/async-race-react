import { Space } from "antd";
import CustomButton from "../Button/CustomButton";
import useGaragePage from "../../hooks/useGaragePage";

function CarControls() {
  const { garageContentProps } = useGaragePage();
  const { handleGenerateRandomCars, handleStartRace, handleStopRace } =
    garageContentProps;

  return (
    <Space>
      <CustomButton onClick={handleGenerateRandomCars}>
        Generate Cars
      </CustomButton>
      <CustomButton onClick={handleStartRace}>Race 👨‍🦽‍➡️ </CustomButton>
      <CustomButton onClick={handleStopRace}>🦽 Race</CustomButton>
    </Space>
  );
}

export default CarControls;
