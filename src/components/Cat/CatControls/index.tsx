import React from "react";
import { Space } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";
import "./index.css";

function CatControls() {
  const { garageContentProps } = useGaragePage();
  const { handleStartRace, handleStopRace, isRacing } = garageContentProps;

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
