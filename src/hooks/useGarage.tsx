import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCars,
  addCar,
  updateCar,
  deleteCar,
} from "../store/api/garageApi";
import { startEngine, stopEngine } from "../store/api/engineApi";
import { generateRandomCars } from "../utils/carGenerator";
import { addWinner } from "../store/slices/winnersSlice";
import {
  setCurrentPage,
  setPositions,
  setWinner,
  setIsRacing,
  setStoppedCars,
  setStartTime,
} from "../store/slices/garageSlice";

const DISTANCE = 100;
const CARS_PER_PAGE = 7;

export const useGarage = () => {
  const dispatch = useDispatch();
  const {
    cars,
    totalCount,
    currentPage,
    positions,
    winner,
    isRacing,
    stoppedCars,
    startTime,
  } = useSelector((state) => state.garage);
  const velocities = useSelector((state) => state.engine.velocities);

  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(performance.now());

  useEffect(() => {
    dispatch(fetchCars({ _page: currentPage, _limit: CARS_PER_PAGE }));
  }, [dispatch, currentPage]);

  const updatePositions = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
    lastUpdateTimeRef.current = currentTime;

    const newPositions = { ...positions };
    const newStoppedCars = new Set(stoppedCars);

    cars.forEach((car) => {
      if (!newStoppedCars.has(car.id)) {
        const velocity = velocities[car.id] || 0;
        const distance = newPositions[car.id] || 0;
        const newDistance = Math.min(distance + velocity * deltaTime, DISTANCE);

        newPositions[car.id] = newDistance;

        if (newDistance >= DISTANCE) {
          newStoppedCars.add(car.id);
          dispatch(stopEngine(car.id));
          if (!winner) {
            dispatch(setWinner(car));
            const raceTime = (currentTime - startTime[car.id]) / 1000;
            dispatch(
              addWinner({ id: car.id, name: car.name, bestTime: raceTime }),
            );
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
    isRacing,
    positions,
    startTime,
    stoppedCars,
    winner,
    velocities,
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

  const handleAddCar = useCallback(
    (newCar) => {
      dispatch(addCar(newCar));
    },
    [dispatch],
  );

  const handleUpdateCar = useCallback(
    (id, updatedCar) => {
      dispatch(updateCar({ id, updatedCar }));
    },
    [dispatch],
  );

  const handleDeleteCar = useCallback(
    (id) => {
      dispatch(deleteCar(id));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchCars({ _page: page, _limit: CARS_PER_PAGE }));
    },
    [dispatch],
  );

  const handleStartRace = useCallback(() => {
    dispatch(setIsRacing(true));
    dispatch(setWinner(null));
    dispatch(setStoppedCars([]));
    dispatch(setPositions({}));
    const newStartTimes = {};
    cars.forEach((car) => {
      dispatch(startEngine(car.id));
      newStartTimes[car.id] = performance.now();
    });
    dispatch(setStartTime(newStartTimes));
  }, [cars, dispatch]);

  const handleStopRace = useCallback(() => {
    dispatch(setIsRacing(false));
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    cars.forEach((car) => {
      dispatch(stopEngine(car.id));
    });
    dispatch(setPositions({}));
    dispatch(setWinner(null));
    dispatch(setStoppedCars([]));
  }, [cars, dispatch]);

  const handleStartEngine = useCallback(
    (id) => {
      dispatch(startEngine(id));
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

  const handleGenerateRandomCars = useCallback(() => {
    const randomCars = generateRandomCars(100);
    randomCars.forEach((car) => {
      dispatch(addCar(car));
    });
  }, [dispatch]);

  return {
    cars,
    totalCount,
    currentPage,
    positions,
    winner,
    isRacing,
    handleAddCar,
    handleUpdateCar,
    handleDeleteCar,
    handlePageChange,
    handleStartRace,
    handleStopRace,
    handleStartEngine,
    handleStopEngine,
    handleGenerateRandomCars,
  };
};

export default useGarage;
