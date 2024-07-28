import { Space } from "antd";
import CustomButton from "../../common/Button";
import useGaragePage from "../../../hooks/useGaragePage";

function CatControls() {
  const { garageContentProps } = useGaragePage();
  const { handleGenerateRandomCats, handleStartRace, handleStopRace } =
    garageContentProps;

  return (
    <Space>
      <CustomButton onClick={handleGenerateRandomCats}>
        Generate Cats
      </CustomButton>
      <CustomButton onClick={handleStartRace}>Race 👨‍🦽‍➡️ </CustomButton>
      <CustomButton onClick={handleStopRace}>🦽 Race</CustomButton>
    </Space>
  );
}

export default CatControls;
