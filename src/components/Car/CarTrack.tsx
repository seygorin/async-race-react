import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CarButtons from "./CarButtons";
import useGaragePage from "../../hooks/useGaragePage";
import useEngineControl from "../../hooks/useEngineControls";
import Car from "./Car";

const CarTrack = ({
  car,
  trackWidth,
  isRacing,
  position,
  totalDistance,
  velocity,
}) => {
  const { garageContentProps } = useGaragePage();
  const {
    handleEditCar,
    handleDeleteCar,
    handleStartEngine,
    handleStopEngine,
  } = garageContentProps;

  const { startEngine, stopEngine, error } = useEngineControl(
    car.id,
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
        <CarButtons
          onStartEngine={startEngine}
          onStopEngine={stopEngine}
          onEditCar={() => handleEditCar(car.id)}
          onDeleteCar={() => handleDeleteCar(car.id)}
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
          <Car
            car={car}
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

export default CarTrack;
