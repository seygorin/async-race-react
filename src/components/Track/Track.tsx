import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTrackWidth } from "../../hooks/useTrackWidth";
import StartLine from "./StartLine";
import FinishLine from "./FinishLine";
import CarList from "../Car/CarList";

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
  const distances = useSelector((state) => state.engine.distances);

  const maxDistance = useMemo(() => {
    const distanceValues = Object.values(distances);
    return Math.max(...distanceValues);
  }, [distances]);

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
      <FinishLine totalDistance={trackWidth} />
      <CarList
        cars={cars}
        velocities={velocities}
        isRacing={isRacing}
        positions={positions}
        handleEditCar={handleEditCar}
        handleDeleteCar={handleDeleteCar}
        handleStartEngine={handleStartEngine}
        handleStopEngine={handleStopEngine}
        totalDistance={maxDistance}
        trackWidth={trackWidth}
      />
    </div>
  );
};

export default Track;
