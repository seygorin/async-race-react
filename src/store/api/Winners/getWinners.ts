import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  ApiBuilder,
  GetWinnersParams,
  GetWinnersResponse,
  Winner,
} from "../apiTypes";

const getWinners = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.query<GetWinnersResponse, GetWinnersParams>({
    query: ({ page, limit }) => `winners?_page=${page}&_limit=${limit}`,
    transformResponse: (response: Winner[], meta) => {
      const totalCountHeader = meta?.response?.headers?.get("X-Total-Count");
      const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
      return {
        winners: response,
        totalCount,
      };
    },
    providesTags: ["Winners"],
  });

export default getWinners;
