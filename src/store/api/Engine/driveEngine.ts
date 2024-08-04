import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "@type/apiTypes";
import {
  DriveEngineSuccessResponse,
  DriveEngineErrorResponse,
  DriveEngineResponse,
} from "@type/engineTypes";
import handleApiError from "../ErrorHandler/apiErrorUtils";

const driveEngine = (
  builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
) =>
  builder.mutation<DriveEngineResponse, number>({
    query: (id) => ({
      url: `engine?id=${id}&status=drive`,
      method: "PATCH",
    }),
    transformResponse: (
      response: DriveEngineSuccessResponse,
      _meta,
      arg: number,
    ): DriveEngineResponse => ({
      id: Number(arg),
      ...response,
    }),
    transformErrorResponse: (
      error: { status: number; data: string },
      _meta,
      arg: number,
    ): { data: DriveEngineErrorResponse } => {
      return {
        data: handleApiError(error, {
          id: Number(arg),
          success: false,
          error: true,
          errorMessage: "An error occurred while driving the engine",
        }) as DriveEngineErrorResponse,
      };
    },
  });

export default driveEngine;
