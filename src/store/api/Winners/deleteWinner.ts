import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder, DeleteWinnerParams } from "../apiTypes";

const deleteWinner = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<void, DeleteWinnerParams>({
    query: ({ id }) => ({
      url: `winners/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Winners"],
  });

export default deleteWinner;
