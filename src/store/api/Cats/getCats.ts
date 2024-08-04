import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import { Cat, GetCatsQueryParams, GetCatsResponse } from "@type/catsTypes";
import handleApiError from "../ErrorHandler/apiErrorUtils";
import mockData from "../../../mocks/index";

const getCats = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.query<GetCatsResponse, GetCatsQueryParams>({
    query: ({ page, limit }) => `garage?_page=${page}&_limit=${limit}`,
    transformResponse: (response: Cat[], meta) => {
      const totalCountHeader = meta?.response?.headers?.get("X-Total-Count");
      const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
      return {
        data: response,
        totalCount,
      };
    },
    transformErrorResponse: (error, _meta, arg) => {
      const { page, limit } = arg;
      const start = (page - 1) * limit;
      const end = start + limit;
      const mockResponse = {
        data: mockData.cats.slice(start, end),
        totalCount: mockData.totalCount,
      };
      return {
        data: handleApiError(error, mockResponse),
      };
    },
    providesTags: ["Cats"],
  });

export default getCats;
