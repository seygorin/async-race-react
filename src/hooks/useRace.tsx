import { useCallback } from "react";
import { useRaceState } from "./useRaceState";
import { useRaceActions } from "./useRaceActions";
import { useRaceAnimation } from "./useRaceAnimation";

import { setStartTime, setIsRacing } from "../store/slices/garageSlice";

export const useRace = (cars) => {
  const raceState = useRaceState();
  const { handleStartEngine, handleStopEngine, resetRace, dispatch } =
    useRaceActions();
  useRaceAnimation(cars);

  const handleStartRace = useCallback(async () => {
    resetRace();
    const newStartTimes = {};
    const startEnginePromises = cars.map((car) => {
      return handleStartEngine(car.id).then(() => {
        newStartTimes[car.id] = performance.now();
      });
    });

    await Promise.all(startEnginePromises);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(true));
  }, [cars, dispatch, handleStartEngine, resetRace]);

  const handleStopRace = useCallback(() => {
    resetRace();
    cars.forEach((car) => {
      handleStopEngine(car.id);
    });
  }, [cars, handleStopEngine, resetRace]);

  return {
    ...raceState,
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
  };
};
