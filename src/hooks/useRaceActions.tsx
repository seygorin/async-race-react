import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startEngine, stopEngine } from "../store/api/engineApi";
import {
  setStartTime,
  setIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "../store/slices/garageSlice";

const useRaceActions = () => {
  const dispatch = useDispatch();

  const handleStartEngine = useCallback(
    async (id) => {
      await dispatch(startEngine(id));
      dispatch(setStartTime({ [id]: performance.now() }));
    },
    [dispatch],
  );

  const handleStopEngine = useCallback(
    (id) => {
      dispatch(stopEngine(id));
    },
    [dispatch],
  );

  const resetRace = useCallback(() => {
    dispatch(setIsRacing(false));
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
