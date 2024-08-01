import { removeWinner } from "@store/slices/winnersSlice";

const deleteCat = (builder) =>
  builder.mutation({
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
  });

export default deleteCat;
