import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ENGINE_URL = "http://localhost:3000/engine";

export const startEngine = createAsyncThunk(
  "engine/startEngine",
  async (id) => {
    const response = await axios.patch(`${ENGINE_URL}?id=${id}&status=started`);
    return { id, ...response.data };
  },
);

export const stopEngine = createAsyncThunk("engine/stopEngine", async (id) => {
  const response = await axios.patch(`${ENGINE_URL}?id=${id}&status=stopped`);
  return { id, ...response.data };
});
