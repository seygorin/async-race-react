import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import handleApiError from "./apiErrorUtils";
import mockData from "../../mocks";

const ENGINE_URL = "http://localhost:3000/engine";

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

export const driveEngine = createAsyncThunk(
  "engine/driveEngine",
  async (id) => {
    try {
      const response = await axios.patch(`${ENGINE_URL}?id=${id}&status=drive`);
      return { id, ...response.data, success: true };
    } catch (error) {
      const mockCat = mockData.driveEngine.cats.find((cat) => cat.id === id);
      return handleApiError(error, { id, ...mockCat });
    }
  },
);
