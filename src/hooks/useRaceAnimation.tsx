import { useCallback, useRef, useEffect } from "react";
import { stopEngine } from "@store/api/engineApi";
import {
  setPositions,
  setWinner,
  setStoppedCats,
  setIsRacing,
} from "@store/slices/garageSlice";
import { addWinner } from "@store/slices/winnersSlice";
import { showModal } from "@store/slices/modalSlice";
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
  const { dispatch, resetRace } = useRaceActions();
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(performance.now());

  const updatePositions = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
    lastUpdateTimeRef.current = currentTime;

    const newPositions = { ...positions };
    const newStoppedCats = new Set(stoppedCats);

    cats.forEach((cat) => {
      if (!newStoppedCats.has(cat.id)) {
        const velocity = velocities[cat.id] * 1000 || 0;
        const distance = distances[cat.id] || 0;
        const currentDistance = newPositions[cat.id] || 0;
        const newDistance = Math.min(
          currentDistance + velocity * deltaTime,
          distance,
        );

        newPositions[cat.id] = newDistance;

        if (newDistance >= distance) {
          newStoppedCats.add(cat.id);
          dispatch(stopEngine(cat.id));
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
        }
      }
    });

    dispatch(setPositions(newPositions));
    dispatch(setStoppedCats(Array.from(newStoppedCats)));

    if (newStoppedCats.size === cats.length) {
      dispatch(setIsRacing(false));
    } else if (isRacing) {
      animationRef.current = requestAnimationFrame(updatePositions);
    }
  }, [
    cats,
    dispatch,
    distances,
    isRacing,
    positions,
    startTime,
    stoppedCats,
    velocities,
    winner,
  ]);

  useEffect(() => {
    if (isRacing) {
      lastUpdateTimeRef.current = performance.now();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(updatePositions);
    } else if (animationRef.current) {
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
