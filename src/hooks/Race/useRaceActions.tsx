import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
} from "@store/api/apiBuilder";

import {
  setIsRacing,
  resetIsRacing,
  setPositions,
  setWinner,
  setStoppedCats,
} from "@store/slices/garageSlice";
import { setDriveStatus } from "@store/slices/driveEngineSlice";
import { EngineResultType } from "@type/engineTypes";

type EngineMutation = (id: number) => Promise<EngineResultType>;

const useEngineAction = (dispatch: Dispatch) => {
  return useCallback(
    async (action: EngineMutation, id: number): Promise<EngineResultType> => {
      try {
        const result = await action(id);

        if (result.error) {
          dispatch(setIsRacing({ [id]: false }));
          return { ...result, stopped: true };
        }
        return result;
      } catch (err: unknown) {
        console.error(`Error in engine action for id ${id}:`, err);
        dispatch(setIsRacing({ [id]: false }));
        return {
          id,
          velocity: 0,
          distance: 0,
          error: true,
          errorMessage: "An error occurred",
        };
      }
    },
    [dispatch],
  );
};

const useStartEngine = (
  handleEngineAction: (action: EngineMutation, id: number) => Promise<EngineResultType>,
  dispatch: Dispatch,
  startEngineMutationTyped: EngineMutation,
  driveEngineMutationTyped: EngineMutation,
) => {
  return useCallback(
    (id: number): Promise<EngineResultType> => {
      return handleEngineAction(startEngineMutationTyped, id).then((result) => {
        dispatch(setIsRacing({ [id]: true }));
        handleEngineAction(driveEngineMutationTyped, id);
        return result;
      });
    },
    [handleEngineAction, dispatch, startEngineMutationTyped, driveEngineMutationTyped],
  );
};
const useStopEngine = (
  handleEngineAction: (action: EngineMutation, id: number) => Promise<EngineResultType>,
  dispatch: Dispatch,
  stopEngineMutationTyped: EngineMutation,
) => {
  return useCallback(
    async (id: number): Promise<EngineResultType> => {
      const result = await handleEngineAction(stopEngineMutationTyped, id);
      dispatch(setIsRacing({ [id]: false }));
      return result;
    },
    [handleEngineAction, dispatch, stopEngineMutationTyped],
  );
};

const useResetRace = (dispatch: Dispatch) => {
  return useCallback(() => {
    dispatch(resetIsRacing());
    dispatch(setPositions({}));
    dispatch(setWinner(null));
    dispatch(setStoppedCats([]));
    dispatch(setDriveStatus("reset"));
  }, [dispatch]);
};

const useRaceActions = () => {
  const dispatch = useDispatch();
  const [startEngineMutation] = useStartEngineMutation();
  const startEngineMutationTyped: EngineMutation = async (id) => {
    const result = await startEngineMutation(id);
    return result.data as EngineResultType;
  };
  const [stopEngineMutation] = useStopEngineMutation();
  const stopEngineMutationTyped: EngineMutation = async (id) => {
    const result = await stopEngineMutation(id);
    return result.data as EngineResultType;
  };
  const [driveEngineMutation] = useDriveEngineMutation();
  const driveEngineMutationTyped: EngineMutation = async (id) => {
    const result = await driveEngineMutation(id);

    const engineResult: EngineResultType = {
      id,
      velocity: 0,
      distance: 0,
      error: !(result.data?.success ?? false),
    };
    return engineResult;
  };
  const handleEngineAction = useEngineAction(dispatch);
  const handleStartEngine = useStartEngine(
    handleEngineAction,
    dispatch,
    startEngineMutationTyped,
    driveEngineMutationTyped,
  );
  const handleStopEngine = useStopEngine(
    handleEngineAction,
    dispatch,
    stopEngineMutationTyped,
  );
  const resetRace = useResetRace(dispatch);
  return { handleStartEngine, handleStopEngine, resetRace, dispatch };
};

export default useRaceActions;
