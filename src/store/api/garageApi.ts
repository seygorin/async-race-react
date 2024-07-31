import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mockData from "../../mocks";

const API_URL = "http://localhost:3000/garage";

const handleApiError = (error, mockResponse) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`API Error (${status}):`, data);
    if (status === 500 || status === 404 || status === 429) {
      return mockResponse;
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    return mockResponse;
  } else {
    console.error("Error setting up request:", error.message);
    return mockResponse;
  }
  return { error: true, ...mockResponse };
};

export const fetchCats = createAsyncThunk(
  "garage/fetchCats",
  async (params, { rejectWithValue }) => {
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

export const addCat = createAsyncThunk(
  "garage/addCat",
  async (newCat, { rejectWithValue }) => {
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
  },
);

export const updateCat = createAsyncThunk(
  "garage/updateCat",
  async ({ id, updatedCat }, { rejectWithValue }) => {
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

export const deleteCat = createAsyncThunk(
  "garage/deleteCat",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return handleApiError(error, id);
    }
  },
);
