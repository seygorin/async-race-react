import React, { useEffect, useRef, useState, useCallback } from "react";
import { message } from "antd";
import CarButtons from "./CarButtons";

const Car = ({
  car,
  position,
  handleEditCar,
  handleDeleteCar,
  handleStartEngine,
  handleStopEngine,
  totalDistance,
  trackWidth,
  isRacing,
  velocity,
}) => {
  const [error, setError] = useState(null);
  const carRef = useRef(null);

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

  const startEngine = useCallback(async () => {
    try {
      setError(null);
      await handleStartEngine(car.id);
    } catch (err) {
      setError("Failed to start engine");
      message.error("Failed to start engine");
    }
  }, [car.id, handleStartEngine]);

  const stopEngine = useCallback(async () => {
    try {
      setError(null);
      await handleStopEngine(car.id);
    } catch (err) {
      setError("Failed to stop engine");
      message.error("Failed to stop engine");
    }
  }, [car.id, handleStopEngine]);

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
        <div
          ref={carRef}
          style={{
            position: "absolute",
						top: "10px",
            left: "30px",
            width: "50px",
            height: "30px",
            backgroundColor: car.color,
            transition: "transform s linear",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "100px",
            right: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <span>{car.name}</span>
          <span>
            {Math.round(position)} / {totalDistance} (Velocity: {velocity})
          </span>
        </div>
        {error && (
          <div style={{ color: "red", position: "absolute", bottom: "-20px" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Car);