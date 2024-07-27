import React, { useEffect, useRef } from "react";
import CarButtons from "./CarButtons";
import useGaragePage from "../../hooks/useGaragePage";
import useEngineControl from "../../hooks/useEngineControls";
import CarIcon from "./CarIcon";
import CarInfo from "./CarInfo";

function Car({ car, position, totalDistance, trackWidth, isRacing, velocity }) {
  const carRef = useRef(null);
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

  useEffect(() => {
    if (carRef.current) {
      const carWidth = 330;
      const maxPosition = trackWidth - carWidth;
      const scaledPosition = Math.min(
        (position / totalDistance) * maxPosition,
        maxPosition,
      );
      carRef.current.style.transform = `translateX(${scaledPosition}px)`;
    }
  }, [position, trackWidth, totalDistance]);

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <CarButtons
        onStartEngine={startEngine}
        onStopEngine={stopEngine}
        onEditCar={() => handleEditCar(car.id)}
        onDeleteCar={() => handleDeleteCar(car.id)}
        isRacing={isRacing}
        velocity={velocity}
      />
      <div style={{ position: "relative", height: "50px", flex: 1 }}>
        <CarIcon car={car} carRef={carRef} />
        <CarInfo
          car={car}
          position={position}
          totalDistance={totalDistance}
          velocity={velocity}
        />
        {error && (
          <div style={{ color: "red", position: "absolute", bottom: "-20px" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Car);
