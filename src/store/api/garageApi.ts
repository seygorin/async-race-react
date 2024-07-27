import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/garage";

export const fetchCats = createAsyncThunk(
  "garage/fetchCats",
  async (params) => {
    const response = await axios.get(API_URL, { params });
    return {
      data: response.data,
      totalCount: response.headers["x-total-count"],
    };
  },
);

export const addCat = createAsyncThunk("garage/addCat", async (newCat) => {
  const response = await axios.post(API_URL, newCat, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
});

export const updateCat = createAsyncThunk(
  "garage/updateCat",
  async ({ id, updatedCat }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedCat, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
);

export const deleteCat = createAsyncThunk("garage/deleteCat", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
