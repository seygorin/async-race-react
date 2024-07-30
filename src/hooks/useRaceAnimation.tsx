import { useCallback, useRef, useEffect } from "react";
import {
  setPositions,
  setWinner,
  setStoppedCats,
  setIsRacing,
} from "../store/slices/garageSlice";
import { addWinner } from "../store/slices/winnersSlice";
import { showModal } from "../store/slices/modalSlice";
import useRaceState from "./useRaceState";
import useRaceActions from "./useRaceActions";

const ONE_SECOND = 1000;

const calculateNewDistance = (
  currentDistance,
  velocity,
  deltaTime,
  totalDistance,
) => {
  return Math.min(currentDistance + velocity * deltaTime, totalDistance);
};

const handleCatFinish = (cat, currentTime, startTime, dispatch) => {
  const raceTime = (currentTime - startTime) / ONE_SECOND;
  dispatch(setWinner({ ...cat, bestTime: raceTime }));
  dispatch(
    addWinner({
      id: cat.id,
      name: cat.name,
      color: cat.color,
      bestTime: raceTime,
    }),
  );
  dispatch(showModal());
};

const updateCatPosition = (cat, deltaTime, currentTime, props) => {
  const {
    velocities,
    distances,
    positions,
    startTime,
    winner,
    handleStopEngine,
    dispatch,
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
      handleCatFinish(cat, currentTime, startTime[cat.id], dispatch);
    }
    return { [cat.id]: distance, stopped: true };
  }

  return { [cat.id]: newDistance, stopped: false };
};

const updatePositions = (cats, props) => {
  const { isRacing, positions, stoppedCats, dispatch, lastUpdateTimeRef } =
    props;
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastUpdateTimeRef.current) / ONE_SECOND;
  lastUpdateTimeRef.current = currentTime;

  const newPositions = { ...positions };
  const newStoppedCats = new Set(stoppedCats);
  let allCatsFinished = true;

  cats.forEach((cat) => {
    if (isRacing[cat.id] && !newStoppedCats.has(cat.id)) {
      const { [cat.id]: newPosition, stopped } = updateCatPosition(
        cat,
        deltaTime,
        currentTime,
        props,
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

const useRaceAnimation = (cats) => {
  const raceState = useRaceState();
  const raceActions = useRaceActions();
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(performance.now());

  const updatePositionsCallback = useCallback(() => {
    const allCatsFinished = updatePositions(cats, {
      ...raceState,
      ...raceActions,
      lastUpdateTimeRef,
    });

    if (allCatsFinished) {
      cancelAnimationFrame(animationRef.current);
      raceActions.dispatch(setIsRacing({}));
    } else {
      animationRef.current = requestAnimationFrame(updatePositionsCallback);
    }
  }, [cats, raceState, raceActions]);

  useEffect(() => {
    const isAnyRacing = Object.values(raceState.isRacing).some(
      (racing) => racing,
    );
    if (isAnyRacing) {
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(updatePositionsCallback);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [raceState.isRacing, updatePositionsCallback]);

  return { resetRace: raceActions.resetRace };
};

export default useRaceAnimation;
