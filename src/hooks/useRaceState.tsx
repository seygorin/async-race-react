import { useSelector } from "react-redux";
import { RootState } from "@store/store";

const useRaceState = () => {
  const positions = useSelector((state: RootState) => state.garage.positions);
  const isRacing = useSelector((state: RootState) => state.garage.isRacing);
  const startTime = useSelector((state: RootState) => state.garage.startTime);
  const velocities = useSelector((state: RootState) => state.engine.velocities);
  const distances = useSelector((state: RootState) => state.engine.distances);
  const winner = useSelector((state: RootState) => state.garage.winner);
  const stoppedCats = useSelector(
    (state: RootState) => state.garage.stoppedCats,
  );

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
