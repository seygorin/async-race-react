import { useSelector } from "react-redux";

const useRaceState = () => {
  const { positions, winner, isRacing, stoppedCats, startTime } = useSelector(
    (state) => state.garage,
  );
  const { velocities, distances } = useSelector((state) => state.engine);

  return {
    positions,
    winner,
    isRacing,
    stoppedCats,
    startTime,
    velocities,
    distances,
  };
};

export default useRaceState;
