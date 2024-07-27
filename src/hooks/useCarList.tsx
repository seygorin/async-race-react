import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCars,
  addCar,
  updateCar,
  deleteCar,
} from "../store/api/garageApi";
import { setCurrentPage } from "../store/slices/garageSlice";
import { generateRandomCars } from "../utils/carGenerator";

const CARS_PER_PAGE = 7;

export const useCarList = () => {
  const dispatch = useDispatch();
  const { cars, totalCount, currentPage } = useSelector(
    (state) => state.garage,
  );

  useEffect(() => {
    dispatch(fetchCars({ _page: currentPage, _limit: CARS_PER_PAGE }));
  }, [dispatch, currentPage]);

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
    handleAddCar,
    handleUpdateCar,
    handleDeleteCar,
    handlePageChange,
    handleGenerateRandomCars,
  };
};
