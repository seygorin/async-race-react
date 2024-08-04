import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateWinnerParams, CreateWinnerResponse } from "@type/winnersTypes";
import { ApiBuilder } from "@type/apiTypes";

const createWinner = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<CreateWinnerResponse, CreateWinnerParams>({
    query: (newWinner) => ({
      url: "winners",
      method: "POST",
      body: newWinner,
    }),
    invalidatesTags: ["Winners"],
  });

export default createWinner;
