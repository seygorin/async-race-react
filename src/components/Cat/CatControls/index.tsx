import { Space } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";
import "./index.css";

function CatControls() {
  const { garageContentProps } = useGaragePage();
  const { handleStartRace, handleStopRace } = garageContentProps;

  return (
    <Space>
      <CustomButton onClick={handleStartRace} className="cat-controls-button">
        Race: <span className="cat-controls-emoji">👨‍🦽‍➡️</span>
      </CustomButton>

      <CustomButton onClick={handleStopRace} className="cat-controls-button">
        Race: <span className="cat-controls-emoji">🦽</span>
      </CustomButton>
    </Space>
  );
}

export default CatControls;
