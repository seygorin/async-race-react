import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import { AddCatResponse, NewCat } from "@type/catsTypes";

const addCat = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<AddCatResponse, NewCat>({
    query: (newCat) => ({
      url: "garage",
      method: "POST",
      body: newCat,
    }),
    invalidatesTags: ["Cats"],
  });

export default addCat;
