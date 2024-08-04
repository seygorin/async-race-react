import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import { DeleteWinnerParams } from "@type/winnersTypes";

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
