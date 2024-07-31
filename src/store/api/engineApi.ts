import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mockData from "../../mocks";

const ENGINE_URL = "http://localhost:3000/engine";

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

export const startEngine = createAsyncThunk(
  "engine/startEngine",
  async (id, { dispatch }) => {
    try {
      const response = await axios.patch(
        `${ENGINE_URL}?id=${id}&status=started`,
      );
      dispatch(driveEngine(id));
      return { id, ...response.data };
    } catch (error) {
      const mockResponse = {
        id,
        ...mockData.startEngine.cats.find((cat) => cat.id === id),
      };
      const result = handleApiError(error, mockResponse);
      if (!result.error) {
        dispatch(driveEngine(id));
      }
      return result;
    }
  },
);

export const stopEngine = createAsyncThunk("engine/stopEngine", async (id) => {
  try {
    const response = await axios.patch(`${ENGINE_URL}?id=${id}&status=stopped`);
    return { id, ...response.data };
  } catch (error) {
    return handleApiError(error, { id, ...mockData.stopEngine });
  }
});

export const driveEngine = createAsyncThunk(
  "engine/driveEngine",
  async (id) => {
    try {
      const response = await axios.patch(`${ENGINE_URL}?id=${id}&status=drive`);
      return { id, ...response.data, success: true };
    } catch (error) {
      const mockCat = mockData.driveEngine.cats.find((cat) => cat.id === id);
      return handleApiError(error, {
        id,
        ...mockCat,
      });
    }
  },
);
