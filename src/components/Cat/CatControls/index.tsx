import { Space } from "antd";
import CustomButton from "@components/common/Button";
import useRace from "@hooks/Race/useRace";
import useStateApp from "@hooks/useStateApp";
import "./index.css";

function CatControls() {
  const { handleStartRace, handleStopRace } = useRace();
  const { status, isRacing } = useStateApp();

  const isAnyCarLoading = Object.values(status).some(
    (statuses) => statuses === "loading",
  );

  const isAnyCarRacing = Object.values(isRacing).some((value) => value);

  const isStartButtonDisabled = isAnyCarRacing || isAnyCarLoading;
  const isStopButtonDisabled = !isAnyCarRacing || isAnyCarLoading;

  return (
    <Space>
      <CustomButton
        onClick={handleStartRace}
        className="cat-controls-button"
        disabled={isStartButtonDisabled}
      >
        Race: <span className="cat-controls-emoji">👨‍🦽‍➡️</span>
      </CustomButton>

      <CustomButton
        onClick={handleStopRace}
        className="cat-controls-button"
        disabled={isStopButtonDisabled}
      >
        Race: <span className="cat-controls-emoji">🦽</span>
      </CustomButton>
    </Space>
  );
}

export default CatControls;
