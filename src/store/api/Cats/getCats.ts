const getCats = (builder) =>
  builder.query({
    query: ({ page, limit }) => `garage?_page=${page}&_limit=${limit}`,
    transformResponse: (response, meta) => {
      return {
        data: response,
        totalCount: parseInt(meta.response.headers.get("X-Total-Count"), 10),
      };
    },
    providesTags: ["Cats"],
  });

export default getCats;
