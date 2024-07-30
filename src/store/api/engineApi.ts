import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mockData from "../../mocks";

const ENGINE_URL = "http://localhost:3000/engine";

const handleApiError = (error, mockResponse) => {
  console.error("API Error:", error);
  return mockResponse;
};

export const startEngine = createAsyncThunk(
  "engine/startEngine",
  async (id) => {
    try {
      const response = await axios.patch(
        `${ENGINE_URL}?id=${id}&status=started`,
      );
      return { id, ...response.data };
    } catch (error) {
      return handleApiError(error, {
        id,
        ...mockData.startEngine.cats.find((cat) => cat.id === id),
      });
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
