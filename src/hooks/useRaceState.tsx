import { useSelector } from "react-redux";

export const useRaceState = () => {
  const { positions, winner, isRacing, stoppedCars, startTime } = useSelector(
    (state) => state.garage,
  );
  const { velocities, distances } = useSelector((state) => state.engine);

  return {
    positions,
    winner,
    isRacing,
    stoppedCars,
    startTime,
    velocities,
    distances,
  };
};
