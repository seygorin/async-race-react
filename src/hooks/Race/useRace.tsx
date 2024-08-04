import { useCallback } from "react";
import useCatList from "@hooks/Cats/useCatList";
import { setStartTime, setIsRacing } from "@store/slices/garageSlice";
import useRaceAnimation from "@hooks/Animation/useRaceAnimation";
import { Cat } from "@type/catsTypes";
import useRaceActions from "./useRaceActions";

interface StartTimes {
  [catId: number]: number;
}

interface IsRacingState {
  [catId: number]: boolean;
}

interface EngineResult {
  error?: boolean;
  broken?: boolean;
  stopped?: boolean;
  id?: number;
  errorMessage?: string;
  velocity?: number;
  distance?: number;
}

interface StartEngineResult {
  newStartTimes: StartTimes;
  newIsRacingState: IsRacingState;
  results: EngineResult[];
}

const useStartEnginesEffect = (
  handleStartEngine: (id: number) => Promise<EngineResult>,
) => {
  return useCallback(
    async (cats: Cat[]): Promise<StartEngineResult> => {
      const newStartTimes: StartTimes = {};
      const newIsRacingState: IsRacingState = {};

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

const useStopEnginesEffect = (
  handleStopEngine: (id: number) => Promise<EngineResult>,
) => {
  return useCallback(
    async (cats: Cat[]): Promise<IsRacingState> => {
      const newIsRacingState: IsRacingState = {};
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
  const { handleStartEngine, handleStopEngine, resetRace, dispatch } = useRaceActions();
  const { cats } = useCatList();
  useRaceAnimation(cats);

  const startEnginesEffect = useStartEnginesEffect(handleStartEngine);
  const stopEnginesEffect = useStopEnginesEffect(handleStopEngine);

  const handleStartRace = useCallback(async () => {
    resetRace();
    const { newStartTimes, newIsRacingState } = await startEnginesEffect(cats);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(newIsRacingState));
  }, [cats, dispatch, resetRace, startEnginesEffect]);

  const handleStopRace = useCallback(async () => {
    const newIsRacingState = await stopEnginesEffect(cats);
    dispatch(setIsRacing(newIsRacingState));
    resetRace();
  }, [cats, dispatch, resetRace, stopEnginesEffect]);

  return {
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
  };
};

export default useRace;
