import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import handleApiError from "./apiErrorUtils";
import mockData from "../../mocks";

const API_URL = "http://localhost:3000/garage";

export const fetchCats = createAsyncThunk(
  "garage/fetchCats",
  async (params) => {
    try {
      const response = await axios.get(API_URL, { params });
      return {
        data: response.data,
        totalCount: parseInt(response.headers["x-total-count"], 10),
      };
    } catch (error) {
      const mockResponse = {
        data: mockData.cats,
        totalCount: mockData.totalCount,
      };
      return handleApiError(error, mockResponse);
    }
  },
);

export const addCat = createAsyncThunk("garage/addCat", async (newCat) => {
  try {
    const response = await axios.post(API_URL, newCat, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, {
      ...newCat,
      id: mockData.cats.length + 1,
    });
  }
});

export const updateCat = createAsyncThunk(
  "garage/updateCat",
  async ({ id, updatedCat }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedCat, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, { id, ...updatedCat });
    }
  },
);

export const deleteCat = createAsyncThunk("garage/deleteCat", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return handleApiError(error, id);
  }
});
