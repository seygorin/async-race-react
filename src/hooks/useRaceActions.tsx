import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startEngine, stopEngine, driveEngine } from "../store/api/engineApi";
import {
  setIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "../store/slices/garageSlice";

const useRaceActions = () => {
  const dispatch = useDispatch();

  const handleEngineAction = useCallback(
    async (action, id) => {
      try {
        const result = await dispatch(action(id)).unwrap();
        if (result.error || result.broken) {
          dispatch(setIsRacing({ [id]: false }));
          if (action !== stopEngine) {
            await dispatch(stopEngine(id));
          }
          return { ...result, stopped: true };
        }
        return result;
      } catch (err) {
        dispatch(setIsRacing({ [id]: false }));
        if (action !== stopEngine) {
          await dispatch(stopEngine(id));
        }
        return { error: true, stopped: true };
      }
    },
    [dispatch],
  );

  const handleStartEngine = useCallback(
    async (id) => {
      const startResult = await handleEngineAction(startEngine, id);
      if (!startResult.error && !startResult.broken) {
        dispatch(setIsRacing({ [id]: true }));
        return handleEngineAction(driveEngine, id);
      }
      return startResult;
    },
    [handleEngineAction, dispatch],
  );

  const handleStopEngine = useCallback(
    async (id) => {
      const result = await handleEngineAction(stopEngine, id);
      dispatch(setIsRacing({ [id]: false }));
      return result;
    },
    [handleEngineAction, dispatch],
  );

  const resetRace = useCallback(() => {
    dispatch(setIsRacing({}));
    dispatch(setPositions({}));
    dispatch(setWinner(null));
    dispatch(setStoppedCats([]));
  }, [dispatch]);

  return {
    handleStartEngine,
    handleStopEngine,
    resetRace,
    dispatch,
  };
};

export default useRaceActions;
