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
    const newIsRacingState = {};

    const startEnginePromises = cats.map((cat) =>
      handleStartEngine(cat.id).then(() => {
        newStartTimes[cat.id] = performance.now();
        newIsRacingState[cat.id] = true;
      }),
    );

    await Promise.all(startEnginePromises);
    dispatch(setStartTime(newStartTimes));
    dispatch(setIsRacing(newIsRacingState));
  }, [cats, dispatch, handleStartEngine, resetRace]);

  const handleStopRace = useCallback(() => {
    resetRace();
    const newIsRacingState = {};

    cats.forEach((cat) => {
      handleStopEngine(cat.id);
      newIsRacingState[cat.id] = false;
    });

    dispatch(setIsRacing(newIsRacingState));
  }, [cats, dispatch, handleStopEngine, resetRace]);

  return {
    ...raceState,
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
  };
};

export default useRace;
