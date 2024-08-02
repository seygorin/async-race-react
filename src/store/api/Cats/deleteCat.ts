import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder, DeleteCatResponse } from "../apiTypes";

const deleteCat = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<DeleteCatResponse, number>({
    query: (id) => ({
      url: `garage/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Cats"],
  });

export default deleteCat;
