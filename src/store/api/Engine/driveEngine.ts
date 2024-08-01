import handleApiError from "../ErrorHandler/apiErrorUtils";
import mockData from "../../../mocks/index";

const driveEngine = (builder) =>
  builder.mutation({
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
  });

export default driveEngine;
