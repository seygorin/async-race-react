import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startEngine, stopEngine } from "../store/api/engineApi";
import {
  setIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "../store/slices/garageSlice";

const useRaceActions = () => {
  const dispatch = useDispatch();

  const handleEngineAction = useCallback(
    (action, id) => {
      return dispatch(action(id))
        .unwrap()
        .catch((err) => console.error(`Failed to ${action.name} engine:`, err));
    },
    [dispatch],
  );

  const handleStartEngine = useCallback(
    async (id) => {
      await handleEngineAction(startEngine, id);
      dispatch(setIsRacing({ [id]: true }));
    },
    [handleEngineAction, dispatch],
  );

  const handleStopEngine = useCallback(
    (id) => handleEngineAction(stopEngine, id),
    [handleEngineAction],
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
