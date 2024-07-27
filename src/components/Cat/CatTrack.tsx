import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CatButtons from "./CatButtons";
import useGaragePage from "../../hooks/useGaragePage";
import useEngineControl from "../../hooks/useEngineControls";
import Cat from "./Cat";

const CatTrack = ({
  cat,
  trackWidth,
  isRacing,
  position,
  totalDistance,
  velocity,
}) => {
  const { garageContentProps } = useGaragePage();
  const {
    handleEditCat,
    handleDeleteCat,
    handleStartEngine,
    handleStopEngine,
  } = garageContentProps;

  const { startEngine, stopEngine, error } = useEngineControl(
    cat.id,
    handleStartEngine,
    handleStopEngine,
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <CatButtons
          onStartEngine={startEngine}
          onStopEngine={stopEngine}
          onEditCat={() => handleEditCat(cat.id)}
          onDeleteCat={() => handleDeleteCat(cat.id)}
          isRacing={isRacing}
          velocity={velocity}
        />
        <div
          style={{
            width: `${trackWidth}px`,
            height: "50px",
            position: "relative",
            background: "#638e9e",
            overflow: "hidden",
            marginLeft: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "4px",
              background:
                "repeating-linear-gradient(90deg, #fff, #fff 20px, transparent 20px, transparent 40px)",
            }}
          />
          <Cat
            cat={cat}
            velocity={velocity}
            position={position}
            totalDistance={totalDistance}
            trackWidth={trackWidth}
          />
        </div>
        {error && (
          <div style={{ marginLeft: "10px", color: "red" }}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default CatTrack;
