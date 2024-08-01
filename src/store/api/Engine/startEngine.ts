import handleApiError from "../ErrorHandler/apiErrorUtils";
import mockData from "../../../mocks/index";

const startEngine = (builder) =>
  builder.mutation({
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
  });

export default startEngine;
