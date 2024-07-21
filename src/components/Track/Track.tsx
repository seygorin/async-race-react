import React from "react";
import { useSelector } from "react-redux";
import { useTrackWidth } from "../../hooks/useTrackWidth";
import StartLine from "./StartLine";
import FinishLine from "./FinishLine";
import CarList from "../Car/CarList";

const TOTAL_DISTANCE = 1500;

const Track = ({
  cars,
  isRacing,
  positions,
  handleEditCar,
  handleDeleteCar,
  handleStartEngine,
  handleStopEngine,
}) => {
  const velocities = useSelector((state) => state.engine.velocities);
  const trackWidth = useTrackWidth();

  return (
    <div
      style={{
        position: "relative",
        marginTop: "20px",
        width: `${trackWidth}px`,
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <StartLine />
      <FinishLine totalDistance={TOTAL_DISTANCE} />
      <CarList
        cars={cars}
        velocities={velocities}
        isRacing={isRacing}
        positions={positions}
        handleEditCar={handleEditCar}
        handleDeleteCar={handleDeleteCar}
        handleStartEngine={handleStartEngine}
        handleStopEngine={handleStopEngine}
        totalDistance={TOTAL_DISTANCE}
        trackWidth={trackWidth}
      />
    </div>
  );
};

export default Track;
