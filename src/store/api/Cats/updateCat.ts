const updateCat = (builder) =>
  builder.mutation({
    query: ({ id, ...updates }) => ({
      url: `garage/${id}`,
      method: "PUT",
      body: updates,
    }),
    invalidatesTags: ["Cats"],
  });

export default updateCat;
