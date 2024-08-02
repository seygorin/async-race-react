import { Space } from "antd";
import CustomButton from "@components/common/Button";
import useRace from "@hooks/Race/useRace";
import useStateApp from "@hooks/useStateApp";
import "./index.css";

function CatControls() {
  const { handleStartRace, handleStopRace } = useRace();
  const { isRacing } = useStateApp();

  const isAnyCarRacing = Object.values(isRacing).some((value) => value);

  return (
    <Space>
      <CustomButton
        onClick={handleStartRace}
        className="cat-controls-button"
        disabled={isAnyCarRacing}
      >
        Race: <span className="cat-controls-emoji">👨‍🦽‍➡️</span>
      </CustomButton>

      <CustomButton
        onClick={handleStopRace}
        className="cat-controls-button"
        disabled={!isAnyCarRacing}
      >
        Race: <span className="cat-controls-emoji">🦽</span>
      </CustomButton>
    </Space>
  );
}

export default CatControls;
