import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  ApiBuilder,
  UpdateWinnerResponse,
  UpdateWinnerParams,
} from "../apiTypes";

const updateWinner = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<UpdateWinnerResponse, UpdateWinnerParams>({
    query: ({ id, ...updates }) => ({
      url: `winners/${id}`,
      method: "PUT",
      body: updates,
    }),
    invalidatesTags: ["Winners"],
  });

export default updateWinner;
