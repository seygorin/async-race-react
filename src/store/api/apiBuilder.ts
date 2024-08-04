import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import { DriveEngineResponse } from "@type/engineTypes";
import { startEngine, stopEngine } from "./Engine/handleEngine";
import driveEngine from "./Engine/driveEngine";
import getCats from "./Cats/getCats";
import addCat from "./Cats/addCat";
import updateCat from "./Cats/updateCat";
import deleteCat from "./Cats/deleteCat";
import getWinners from "./Winners/getWinners";
import createWinner from "./Winners/createWinner";
import deleteWinner from "./Winners/deleteWinner";
import updateWinner from "./Winners/updateWinner";

export const apiBuilder = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }) as ApiBuilder,
  tagTypes: ["Engine", "Cats", "Winners"],
  endpoints: (builder) => ({
    startEngine: startEngine(builder),
    stopEngine: stopEngine(builder),
    driveEngine: driveEngine(builder),
    getCats: getCats(builder),
    addCat: addCat(builder),
    updateCat: updateCat(builder),
    deleteCat: deleteCat(builder),
    getWinners: getWinners(builder),
    createWinner: createWinner(builder),
    deleteWinner: deleteWinner(builder),
    updateWinner: updateWinner(builder),
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
  useGetWinnersQuery,
  useCreateWinnerMutation,
  useDeleteWinnerMutation,
  useUpdateWinnerMutation,
} = apiBuilder;

export type { DriveEngineResponse };
