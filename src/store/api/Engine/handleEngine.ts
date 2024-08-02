import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiBuilder } from "../apiTypes";
import handleApiError from "../ErrorHandler/apiErrorUtils";
// import mockData from "../../../mocks/index";

export interface EngineSuccessResponse {
  velocity: number;
  distance: number;
}

export interface EngineErrorResponse {
  id: number;
  velocity: number;
  distance: number;
}

export type EngineResponse = EngineSuccessResponse & { id: number };

const createEngineMutation =
  (status: "started" | "stopped") =>
  (
    builder: EndpointBuilder<ApiBuilder, "Engine" | "Cats" | "Winners", "api">,
  ) =>
    builder.mutation<EngineResponse, number>({
      query: (id) => ({
        url: `engine?id=${id}&status=${status}`,
        method: "PATCH",
      }),
      transformResponse: (
        response: EngineSuccessResponse,
        meta,
        arg: number,
      ): EngineResponse => ({
        id: Number(arg),
        ...response,
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | { status: number; data: string },
        meta,
        arg: number,
      ): { data: EngineErrorResponse } => {
        // const mockDataSource =
        //   status === "started" ? mockData.startEngine : mockData.stopEngine;
        // const mockCat = mockDataSource.cats.find(
        //   (cat) => cat.id === Number(arg),
        // );
        const result = handleApiError(error, {
          id: Number(arg),
          // ...(mockCat || {}),
          velocity: 0,
          distance: 0,
        }) as EngineErrorResponse;
        return { data: result };
      },
    });

export const startEngine = createEngineMutation("started");
export const stopEngine = createEngineMutation("stopped");
