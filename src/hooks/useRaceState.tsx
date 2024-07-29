import { useSelector } from "react-redux";

const useRaceState = () => {
  const positions = useSelector((state) => state.garage.positions);
  const isRacing = useSelector((state) => state.garage.isRacing);
  const startTime = useSelector((state) => state.garage.startTime);
  const velocities = useSelector((state) => state.engine.velocities);
  const distances = useSelector((state) => state.engine.distances);
  const winner = useSelector((state) => state.garage.winner);
  const stoppedCats = useSelector((state) => state.garage.stoppedCats);

  return {
    positions,
    isRacing,
    startTime,
    velocities,
    distances,
    winner,
    stoppedCats,
  };
};

export default useRaceState;
