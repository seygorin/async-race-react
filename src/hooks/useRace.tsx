import { useCallback } from "react";
import useRaceState from "./useRaceState";
import useRaceActions from "./useRaceActions";
import useRaceAnimation from "./useRaceAnimation";
import { setStartTime, setIsRacing } from "../store/slices/garageSlice";

const useStartEngines = (handleStartEngine) => {
  return useCallback(
    async (cats) => {
      const newStartTimes = {};
      const newIsRacingState = {};

      const startEnginePromises = cats.map((cat) =>
        handleStartEngine(cat.id).then((result) => {
          newStartTimes[cat.id] = performance.now();
          newIsRacingState[cat.id] = true;
          return result;
        }),
      );

      const results = await Promise.all(startEnginePromises);
      return { newStartTimes, newIsRacingState, results };
    },
    [handleStartEngine],
  );
};

const useStopEngines = (handleStopEngine) => {
  return useCallback(
    (cats) => {
      const newIsRacingState = {};
      cats.forEach((cat) => {
        handleStopEngine(cat.id);
        newIsRacingState[cat.id] = false;
      });
      return newIsRacingState;
    },
    [handleStopEngine],
  );
};

const useRace = (cats) => {
  const raceState = useRaceState();
  const { handleStartEngine, handleStopEngine, resetRace, dispatch } =
    useRaceActions();
  useRaceAnimation(cats);

  const startEngines = useStartEngines(handleStartEngine);
  const stopEngines = useStopEngines(handleStopEngine);

  const handleStartRace = useCallback(async () => {
    resetRace();
    const { newStartTimes, newIsRacingState, results } =
      await startEngines(cats);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(newIsRacingState));

    results.forEach((result) => {
      if (result.broken) {
        console.log(`Car ${result.id} broke down!`);
      }
    });
  }, [cats, dispatch, resetRace, startEngines]);

  const handleStopRace = useCallback(() => {
    resetRace();
    const newIsRacingState = stopEngines(cats);
    dispatch(setIsRacing(newIsRacingState));
  }, [cats, dispatch, resetRace, stopEngines]);

  return {
    ...raceState,
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
  };
};

export default useRace;
