import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
} from "../store/api/engineApi";
import {
  setIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "../store/slices/garageSlice";

const useRaceActions = () => {
  const dispatch = useDispatch();
  const [startEngineMutation] = useStartEngineMutation();
  const [stopEngineMutation] = useStopEngineMutation();
  const [driveEngineMutation] = useDriveEngineMutation();

  const handleEngineAction = useCallback(
    async (action, id) => {
      try {
        const result = await action(id).unwrap();
        if (result.error || result.broken) {
          dispatch(setIsRacing({ [id]: false }));
          if (action !== stopEngineMutation) {
            await stopEngineMutation(id).unwrap();
          }
          return { ...result, stopped: true };
        }
        return result;
      } catch (err) {
        console.error(`Error in engine action for id ${id}:`, err);
        dispatch(setIsRacing({ [id]: false }));
        if (action !== stopEngineMutation) {
          try {
            await stopEngineMutation(id).unwrap();
          } catch (stopErr) {
            console.error(`Error stopping engine for id ${id}:`, stopErr);
          }
        }
        return { error: true, errorMessage: err.message, stopped: true, id };
      }
    },
    [dispatch, stopEngineMutation],
  );

  const handleStartEngine = useCallback(
    async (id) => {
      const startResult = await handleEngineAction(startEngineMutation, id); // тут какая-то загадочная ошибка
      dispatch(setIsRacing({ [id]: true }));
      return handleEngineAction(driveEngineMutation, id);
    },
    [handleEngineAction, dispatch, startEngineMutation, driveEngineMutation],
  );

  const handleStopEngine = useCallback(
    async (id) => {
      const result = await handleEngineAction(stopEngineMutation, id);
      dispatch(setIsRacing({ [id]: false }));
      return result;
    },
    [handleEngineAction, dispatch, stopEngineMutation],
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
