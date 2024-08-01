import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeWinner } from "../slices/winnersSlice"; // Убедитесь, что путь импорта правильный

export const catsApi = createApi({
  reducerPath: "catsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Cats"],
  endpoints: (builder) => ({
    getCats: builder.query({
      query: ({ page, limit }) => `garage?_page=${page}&_limit=${limit}`,
      transformResponse: (response, meta) => {
        return {
          data: response,
          totalCount: parseInt(meta.response.headers.get("X-Total-Count"), 10),
        };
      },
      providesTags: ["Cats"],
    }),
    addCat: builder.mutation({
      query: (newCat) => ({
        url: "garage",
        method: "POST",
        body: newCat,
      }),
      invalidatesTags: ["Cats"],
    }),
    updateCat: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `garage/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Cats"],
    }),
    deleteCat: builder.mutation({
      query: (id) => ({
        url: `garage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cats"],
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(removeWinner(id));
        } catch {
          console.error("Failed to delete cat");
        }
      },
    }),
  }),
});

export const {
  useGetCatsQuery,
  useAddCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} = catsApi;
