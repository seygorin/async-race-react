import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
} from "../../store/api/apiBuilder";
import {
  setIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "../../store/slices/garageSlice";

interface EngineResult {
  error?: boolean;
  broken?: boolean;
  stopped?: boolean;
  id?: number;
  errorMessage?: string;
}

type EngineMutation = (id: number) => Promise<EngineResult>;

const useEngineAction = (
  dispatch: Dispatch,
  stopEngineMutation: EngineMutation,
) => {
  return useCallback(
    async (action: EngineMutation, id: number): Promise<EngineResult> => {
      try {
        const result = await action(id);
        if (result.error || result.broken) {
          dispatch(setIsRacing({ [id]: false }));
          if (action !== stopEngineMutation) {
            await stopEngineMutation(id);
          }
          return { ...result, stopped: true };
        }
        return result;
      } catch (err: unknown) {
        console.error(`Error in engine action for id ${id}:`, err);
        dispatch(setIsRacing({ [id]: false }));
        if (action !== stopEngineMutation) {
          try {
            await stopEngineMutation(id);
          } catch (stopErr) {
            console.error(`Error stopping engine for id ${id}:`, stopErr);
          }
        }
        return {
          error: true,
          errorMessage:
            err instanceof Error ? err.message : "An unknown error occurred",
          stopped: true,
          id,
        };
      }
    },
    [dispatch, stopEngineMutation],
  );
};

const useStartEngine = (
  handleEngineAction: (
    action: EngineMutation,
    id: number,
  ) => Promise<EngineResult>,
  dispatch: Dispatch,
  startEngineMutation: EngineMutation,
  driveEngineMutation: EngineMutation,
) => {
  return useCallback(
    async (id: number): Promise<EngineResult> => {
      await handleEngineAction(startEngineMutation, id);
      dispatch(setIsRacing({ [id]: true }));
      return handleEngineAction(driveEngineMutation, id);
    },
    [handleEngineAction, dispatch, startEngineMutation, driveEngineMutation],
  );
};

const useStopEngine = (
  handleEngineAction: (
    action: EngineMutation,
    id: number,
  ) => Promise<EngineResult>,
  dispatch: Dispatch,
  stopEngineMutation: EngineMutation,
) => {
  return useCallback(
    async (id: number): Promise<EngineResult> => {
      const result = await handleEngineAction(stopEngineMutation, id);
      dispatch(setIsRacing({ [id]: false }));
      return result;
    },
    [handleEngineAction, dispatch, stopEngineMutation],
  );
};

const useResetRace = (dispatch: Dispatch) => {
  return useCallback(() => {
    dispatch(setIsRacing({}));
    dispatch(setPositions({}));
    dispatch(setWinner(null));
    dispatch(setStoppedCats([]));
  }, [dispatch]);
};

const useRaceActions = () => {
  const dispatch = useDispatch();
  const [startEngineMutation] = useStartEngineMutation();
  const [stopEngineMutation] = useStopEngineMutation();
  const [driveEngineMutation] = useDriveEngineMutation();

  const handleEngineAction = useEngineAction(dispatch, stopEngineMutation);
  const handleStartEngine = useStartEngine(
    handleEngineAction,
    dispatch,
    startEngineMutation,
    driveEngineMutation,
  );
  const handleStopEngine = useStopEngine(
    handleEngineAction,
    dispatch,
    stopEngineMutation,
  );
  const resetRace = useResetRace(dispatch);

  return {
    handleStartEngine,
    handleStopEngine,
    resetRace,
    dispatch,
  };
};

export default useRaceActions;
