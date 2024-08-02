import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  ApiBuilder,
  GetCatsQueryParams,
  GetCatsResponse,
  Cat,
} from "../apiTypes";

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
        totalCount: totalCount,
      };
    },
    providesTags: ["Cats"],
  });

export default getCats;
