import { useCallback, useRef, useEffect } from "react";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import {
  setPositions,
  setWinner,
  setStoppedCats,
  setIsRacing,
} from "@store/slices/garageSlice";
import useWinners from "@hooks/Winners/useWinners";
import { showModal } from "@store/slices/modalSlice";
import { EngineResultType } from "@type/engineTypes";
import { Cat } from "@type/catsTypes";
import { Winner } from "@type/winnersTypes";
import useRaceState from "../useStateApp";
import useRaceActions from "../Race/useRaceActions";

const ONE_SECOND = 1000;

interface RaceState {
  velocities: Record<number, number>;
  distances: Record<number, number>;
  positions: Record<number, number>;
  startTime: Record<number, number>;
  winner: Cat | null;
  isRacing: Record<number, boolean>;
  stoppedCats: number[];
}

interface RaceActions {
  handleStopEngine: (id: number) => Promise<EngineResultType>;
  dispatch: Dispatch<AnyAction>;
  resetRace: () => void;
}

const calculateNewDistance = (
  currentDistance: number,
  velocity: number,
  deltaTime: number,
  totalDistance: number,
): number => {
  return Math.min(currentDistance + velocity * deltaTime, totalDistance);
};

const handleCatFinish = (
  cat: Cat,
  currentTime: number,
  startTime: number,
  dispatch: Dispatch<AnyAction>,
  handleWinnerUpdate: (winnerData: Winner) => Promise<void>,
): void => {
  const raceTime = (currentTime - startTime) / ONE_SECOND;

  dispatch(setWinner({ ...cat, bestTime: raceTime }));

  handleWinnerUpdate({
    id: cat.id,
    name: cat.name,
    color: cat.color,
    wins: 1,
    bestTime: parseFloat(raceTime.toFixed(1)),
  });

  dispatch(showModal());
};

interface UpdateCatPositionProps extends RaceState, RaceActions {
  lastUpdateTimeRef: React.MutableRefObject<number>;
  handleWinnerUpdate: (winnerData: Winner) => Promise<void>;
}

interface UpdateCatPositionResult {
  [key: number]: number;
  stopped: boolean;
}

const updateCatPosition = (
  cat: Cat,
  deltaTime: number,
  currentTime: number,
  props: UpdateCatPositionProps,
): UpdateCatPositionResult => {
  const {
    velocities,
    distances,
    positions,
    startTime,
    winner,
    handleStopEngine,
    dispatch,
    handleWinnerUpdate,
  } = props;
  const velocity = velocities[cat.id] * ONE_SECOND || 0;
  const distance = distances[cat.id] || 0;
  const currentDistance = positions[cat.id] || 0;
  const newDistance = calculateNewDistance(
    currentDistance,
    velocity,
    deltaTime,
    distance,
  );

  if (newDistance >= distance) {
    handleStopEngine(cat.id);
    if (!winner) {
      handleCatFinish(cat, currentTime, startTime[cat.id], dispatch, handleWinnerUpdate);
    }
    return { [cat.id]: distance, stopped: true };
  }
  return { [cat.id]: newDistance, stopped: false };
};

const updatePositions = (cats: Cat[], props: UpdateCatPositionProps): boolean => {
  const {
    isRacing,
    positions,
    stoppedCats,
    dispatch,
    lastUpdateTimeRef,
    handleWinnerUpdate,
  } = props;
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastUpdateTimeRef.current) / ONE_SECOND;
  lastUpdateTimeRef.current = currentTime;
  const newPositions: Record<number, number> = { ...positions };
  const newStoppedCats = new Set(stoppedCats);
  let allCatsFinished = true;

  cats.forEach((cat) => {
    if (isRacing[cat.id] && !newStoppedCats.has(cat.id)) {
      const { [cat.id]: newPosition, stopped } = updateCatPosition(
        cat,
        deltaTime,
        currentTime,
        {
          ...props,
          handleWinnerUpdate,
        },
      );
      newPositions[cat.id] = newPosition;
      if (stopped) {
        newStoppedCats.add(cat.id);
        dispatch(setIsRacing({ [cat.id]: false }));
      } else {
        allCatsFinished = false;
      }
    }
  });
  dispatch(setPositions(newPositions));
  dispatch(setStoppedCats(Array.from(newStoppedCats)));
  return allCatsFinished;
};

const useRaceAnimation = (cats: Cat[]) => {
  const raceState = useRaceState();
  const raceActions = useRaceActions();
  const { handleWinnerUpdate } = useWinners();
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef(performance.now());

  const updatePositionsCallback = useCallback(() => {
    const allCatsFinished = updatePositions(cats, {
      ...raceState,
      ...raceActions,
      lastUpdateTimeRef,
      handleWinnerUpdate,
    });
    if (allCatsFinished) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      raceActions.dispatch(setIsRacing({}));
    } else {
      animationRef.current = requestAnimationFrame(updatePositionsCallback);
    }
  }, [cats, raceState, raceActions, handleWinnerUpdate]);
  useEffect(() => {
    const isAnyRacing = Object.values(raceState.isRacing).some((racing) => racing);
    if (isAnyRacing) {
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(updatePositionsCallback);
    } else if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [raceState.isRacing, updatePositionsCallback]);
  return { resetRace: raceActions.resetRace };
};

export default useRaceAnimation;
