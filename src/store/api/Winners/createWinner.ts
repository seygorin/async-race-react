import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder, CreateWinnerParams, CreateWinnerResponse } from "../apiTypes";

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
