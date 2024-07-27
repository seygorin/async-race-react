import { useCallback } from "react";
import useRaceState from "./useRaceState";
import useRaceActions from "./useRaceActions";
import useRaceAnimation from "./useRaceAnimation";

import { setStartTime, setIsRacing } from "../store/slices/garageSlice";

const useRace = (cats) => {
  const raceState = useRaceState();
  const { handleStartEngine, handleStopEngine, resetRace, dispatch } =
    useRaceActions();
  useRaceAnimation(cats);

  const handleStartRace = useCallback(async () => {
    resetRace();
    const newStartTimes = {};
    const startEnginePromises = cats.map((cat) => {
      return handleStartEngine(cat.id).then(() => {
        newStartTimes[cat.id] = performance.now();
      });
    });

    await Promise.all(startEnginePromises);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(true));
  }, [cats, dispatch, handleStartEngine, resetRace]);

  const handleStopRace = useCallback(() => {
    resetRace();
    cats.forEach((cat) => {
      handleStopEngine(cat.id);
    });
  }, [cats, handleStopEngine, resetRace]);

  return {
    ...raceState,
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
  };
};

export default useRace;
