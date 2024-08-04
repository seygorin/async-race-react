import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiBuilder } from "@type/apiTypes";
import {
  EngineResponse,
  EngineErrorResponse,
  EngineResult,
  EngineMutationDefinition,
  EngineSuccessResponse,
} from "@type/engineTypes";
import handleApiError from "../ErrorHandler/apiErrorUtils";

const createEngineMutation =
  (status: "started" | "stopped") =>
  (
    builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
  ): EngineMutationDefinition =>
    builder.mutation<EngineResult, number>({
      query: (id) => ({
        url: `engine?id=${id}&status=${status}`,
        method: "PATCH",
      }),
      transformResponse: (
        response: EngineSuccessResponse,
        _meta,
        arg: number,
      ): EngineResponse => ({
        id: Number(arg),
        ...response,
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | { status: number; data: string },
        _meta,
        arg: number,
      ): EngineErrorResponse => {
        const result = handleApiError(error, {
          id: Number(arg),
          velocity: 0,
          distance: 0,
        });
        return result as EngineErrorResponse;
      },
    });

export const startEngine = createEngineMutation("started");
export const stopEngine = createEngineMutation("stopped");
