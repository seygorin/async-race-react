import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetWinnersParams, GetWinnersResponse, Winner } from "@type/winnersTypes";
import { ApiBuilder } from "@type/apiTypes";

const getWinners = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.query<GetWinnersResponse, GetWinnersParams>({
    query: ({ page, limit, sort, order }) => ({
      url: "winners",
      params: {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
      },
    }),
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
