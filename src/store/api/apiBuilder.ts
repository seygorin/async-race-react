import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import startEngine from "./Engine/startEngine";
import stopEngine from "./Engine/stopEngine";
import driveEngine from "./Engine/driveEngine";
import getCats from "./Cats/getCats";
import addCat from "./Cats/addCat";
import updateCat from "./Cats/updateCat";
import deleteCat from "./Cats/deleteCat";

export const apiBuilder = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Engine", "Cats"],
  endpoints: (builder) => ({
    startEngine: startEngine(builder),
    stopEngine: stopEngine(builder),
    driveEngine: driveEngine(builder),
    getCats: getCats(builder),
    addCat: addCat(builder),
    updateCat: updateCat(builder),
    deleteCat: deleteCat(builder),
  }),
});

export const {
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
  useGetCatsQuery,
  useAddCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} = apiBuilder;
