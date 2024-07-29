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

const useRaceAnimation = (cats) => {
  const {
    positions,
    isRacing,
    startTime,
    velocities,
    distances,
    winner,
    stoppedCats,
  } = useRaceState();
  const { dispatch, resetRace, handleStopEngine } = useRaceActions();
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(performance.now());

  const updateCatPosition = useCallback(
    (cat, deltaTime, currentTime) => {
      const velocity = velocities[cat.id] * 1000 || 0;
      const distance = distances[cat.id] || 0;
      const currentDistance = positions[cat.id] || 0;
      const newDistance = Math.min(
        currentDistance + velocity * deltaTime,
        distance,
      );

      if (newDistance >= distance) {
        handleStopEngine(cat.id);
        if (!winner) {
          const raceTime = (currentTime - startTime[cat.id]) / 1000;
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
        }
        return { [cat.id]: distance, stopped: true };
      }

      return { [cat.id]: newDistance, stopped: false };
    },
    [
      dispatch,
      distances,
      handleStopEngine,
      positions,
      startTime,
      velocities,
      winner,
    ],
  );

  const updatePositions = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
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

    if (allCatsFinished) {
      cancelAnimationFrame(animationRef.current);
      dispatch(setIsRacing({}));
    } else {
      animationRef.current = requestAnimationFrame(updatePositions);
    }
  }, [cats, dispatch, isRacing, positions, stoppedCats, updateCatPosition]);

  useEffect(() => {
    const isAnyRacing = Object.values(isRacing).some((racing) => racing);
    if (isAnyRacing) {
      lastUpdateTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(updatePositions);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRacing, updatePositions]);

  return { resetRace };
};

export default useRaceAnimation;
