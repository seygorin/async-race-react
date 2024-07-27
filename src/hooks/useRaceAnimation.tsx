import { useCallback, useRef, useEffect } from "react";
import useRaceState from "./useRaceState";
import useRaceActions from "./useRaceActions";
import { stopEngine } from "../store/api/engineApi";
import {
  setPositions,
  setWinner,
  setStoppedCars,
  setIsRacing,
} from "../store/slices/garageSlice";
import { addWinner } from "../store/slices/winnersSlice";
import { showModal } from "../store/slices/modalSlice";

const useRaceAnimation = (cars) => {
  const {
    positions,
    isRacing,
    startTime,
    velocities,
    distances,
    winner,
    stoppedCars,
  } = useRaceState();
  const { dispatch, resetRace } = useRaceActions();
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(performance.now());

  const updatePositions = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
    lastUpdateTimeRef.current = currentTime;

    const newPositions = { ...positions };
    const newStoppedCars = new Set(stoppedCars);

    cars.forEach((car) => {
      if (!newStoppedCars.has(car.id)) {
        const velocity = velocities[car.id] * 1000 || 0;
        const distance = distances[car.id] || 0;
        const currentDistance = newPositions[car.id] || 0;
        const newDistance = Math.min(
          currentDistance + velocity * deltaTime,
          distance,
        );

        newPositions[car.id] = newDistance;

        if (newDistance >= distance) {
          newStoppedCars.add(car.id);
          dispatch(stopEngine(car.id));
          if (!winner) {
            const raceTime = (currentTime - startTime[car.id]) / 1000;
            dispatch(setWinner({ ...car, bestTime: raceTime }));
            dispatch(
              addWinner({ id: car.id, name: car.name, bestTime: raceTime }),
            );
            dispatch(showModal());
          }
        }
      }
    });

    dispatch(setPositions(newPositions));
    dispatch(setStoppedCars(Array.from(newStoppedCars)));

    if (newStoppedCars.size === cars.length) {
      dispatch(setIsRacing(false));
    } else if (isRacing) {
      animationRef.current = requestAnimationFrame(updatePositions);
    }
  }, [
    cars,
    dispatch,
    distances,
    isRacing,
    positions,
    startTime,
    stoppedCars,
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
