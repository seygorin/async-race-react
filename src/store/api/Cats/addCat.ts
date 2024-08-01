const addCat = (builder) =>
  builder.mutation({
    query: (newCat) => ({
      url: "garage",
      method: "POST",
      body: newCat,
    }),
    invalidatesTags: ["Cats"],
  });

export default addCat;
