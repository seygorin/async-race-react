import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/garage";

export const fetchCars = createAsyncThunk(
  "garage/fetchCars",
  async (params) => {
    const response = await axios.get(API_URL, { params });
    return {
      data: response.data,
      totalCount: response.headers["x-total-count"],
    };
  },
);

export const addCar = createAsyncThunk("garage/addCar", async (newCar) => {
  const response = await axios.post(API_URL, newCar, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
});

export const updateCar = createAsyncThunk(
  "garage/updateCar",
  async ({ id, updatedCar }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedCar, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
);

export const deleteCar = createAsyncThunk("garage/deleteCar", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
