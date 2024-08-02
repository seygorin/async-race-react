import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "../apiTypes";
import handleApiError from "../ErrorHandler/apiErrorUtils";
import mockData from "../../../mocks/index";

export interface DriveEngineSuccessResponse {
  success: boolean;
}

export interface DriveEngineErrorResponse {
  id: number;
  success: boolean;
}

export type DriveEngineResponse = DriveEngineSuccessResponse & { id: number };

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
      const mockCat = mockData.driveEngine.cats.find(
        (cat) => cat.id === Number(arg),
      );
      return {
        data: handleApiError(error, {
          id: Number(arg),
          ...(mockCat || {}),
          success: false,
        }) as DriveEngineErrorResponse,
      };
    },
  });

export default driveEngine;
