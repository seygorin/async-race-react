import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import handleApiError from "./apiErrorUtils";
import mockData from "../../mocks";

export const engineApi = createApi({
  reducerPath: "engineApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Engine"],
  endpoints: (builder) => ({
    startEngine: builder.mutation({
      query: (id) => ({
        url: `engine?id=${id}&status=started`,
        method: "PATCH",
      }),
      transformResponse: (response, meta, arg) => ({
        id: Number(arg),
        ...response,
      }),
      transformErrorResponse: (error, meta, arg) => {
        const mockCat = mockData.startEngine.cats.find(
          (cat) => cat.id === Number(arg),
        );
        const result = handleApiError(error, {
          id: Number(arg),
          ...(mockCat || {}),
        });
        return { data: result };
      },
    }),
    stopEngine: builder.mutation({
      query: (id) => ({
        url: `engine?id=${id}&status=stopped`,
        method: "PATCH",
      }),
      transformResponse: (response, meta, arg) => ({
        id: Number(arg),
        ...response,
      }),
      transformErrorResponse: (error, meta, arg) => {
        return {
          data: handleApiError(error, {
            id: Number(arg),
            ...mockData.stopEngine,
          }),
        };
      },
    }),
    driveEngine: builder.mutation({
      query: (id) => ({
        url: `engine?id=${id}&status=drive`,
        method: "PATCH",
      }),
      transformResponse: (response, meta, arg) => ({
        id: Number(arg),
        ...response,
        success: true,
      }),
      transformErrorResponse: (error, meta, arg) => {
        const mockCat = mockData.driveEngine.cats.find(
          (cat) => cat.id === Number(arg),
        );
        return {
          data: handleApiError(error, { id: Number(arg), ...(mockCat || {}) }),
        };
      },
    }),
  }),
});

export const {
  useStartEngineMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
} = engineApi;
