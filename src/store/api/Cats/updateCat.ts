import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import { UpdateCatParams, UpdateCatResponse } from "@type/catsTypes";

const updateCat = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<UpdateCatResponse, UpdateCatParams>({
    query: ({ id, ...updates }) => ({
      url: `garage/${id}`,
      method: "PUT",
      body: updates,
    }),
    invalidatesTags: ["Cats"],
  });

export default updateCat;
