import { useCallback } from "react";
import { useCatList } from "@containers/CatListContainer/hook/useCatList";
import { setStartTime, setIsRacing } from "@store/slices/garageSlice";
import useRaceState from "./useRaceState";
import useRaceActions from "./useRaceActions";
import useRaceAnimation from "./useRaceAnimation";

const useStartEngines = (handleStartEngine) => {
  return useCallback(
    async (cats) => {
      const newStartTimes = {};
      const newIsRacingState = {};

      const startEnginePromises = cats.map(async (cat) => {
        try {
          const result = await handleStartEngine(cat.id);
          newStartTimes[cat.id] = performance.now();
          newIsRacingState[cat.id] = !result.error && !result.stopped;
          return result;
        } catch (err) {
          console.error(`Error starting engine for cat ${cat.id}:`, err);
          newIsRacingState[cat.id] = false;
          return {
            error: true,
            errorMessage: "hello",
            id: cat.id,
            stopped: true,
          };
        }
      });

      const results = await Promise.all(startEnginePromises);
      return { newStartTimes, newIsRacingState, results };
    },
    [handleStartEngine],
  );
};

const useStopEngines = (handleStopEngine) => {
  return useCallback(
    async (cats) => {
      const newIsRacingState = {};
      const stopPromises = cats.map(async (cat) => {
        try {
          await handleStopEngine(cat.id);
          newIsRacingState[cat.id] = false;
        } catch (err) {
          console.error(`Error stopping engine for cat ${cat.id}:`, err);
          newIsRacingState[cat.id] = false;
        }
      });

      await Promise.all(stopPromises);
      return newIsRacingState;
    },
    [handleStopEngine],
  );
};

const useRace = () => {
  const raceState = useRaceState();
  const { handleStartEngine, handleStopEngine, resetRace, dispatch } =
    useRaceActions();
  const { cats } = useCatList();
  useRaceAnimation(cats);

  const startEngines = useStartEngines(handleStartEngine);
  const stopEngines = useStopEngines(handleStopEngine);

  const handleStartRace = useCallback(async () => {
    resetRace();
    const { newStartTimes, newIsRacingState } = await startEngines(cats);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(newIsRacingState));
  }, [cats, dispatch, resetRace, startEngines]);

  const handleStopRace = useCallback(async () => {
    resetRace();
    const newIsRacingState = await stopEngines(cats);
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
