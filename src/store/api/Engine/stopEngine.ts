import handleApiError from "../ErrorHandler/apiErrorUtils";
import mockData from "../../../mocks/index";

const stopEngine = (builder) =>
  builder.mutation({
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
  });

export default stopEngine;
