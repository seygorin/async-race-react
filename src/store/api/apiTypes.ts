import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";

export type ApiBuilder = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  NonNullable<unknown>,
  FetchBaseQueryMeta
>;

export interface Cat {
  id: number;
  name: string;
  color: string;
}

export interface NewCat {
  name: string;
  color: string;
}

export interface AddCatResponse extends Cat {}

export interface GetCatsQueryParams {
  page: number;
  limit: number;
}

export interface GetCatsResponse {
  data: Cat[];
  totalCount: number;
}

export interface UpdateCatParams {
  id: number;
  name?: string;
  color?: string;
}

export interface UpdateCatResponse extends Cat {}

export interface ApiError {
  status: number | "FETCH_ERROR";
  data?: {
    message?: string;
  };
}

export interface MockResponse {
  [key: string]: boolean | string | number;
}
export type DeleteCatResponse = NonNullable<unknown>;

export type HandleApiErrorResponse<T> = T & {
  error: boolean;
  errorMessage: string;
};

export interface Winner {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface GetWinnerParams {
  id: number;
}

export interface GetWinnerResponse {
  id: number;
  wins: number;
  time: number;
}

export interface CreateWinnerParams {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface CreateWinnerResponse {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface DeleteWinnerParams {
  id: number;
}

export interface UpdateWinnerParams {
  id: number;
  wins: number;
}

export interface UpdateWinnerResponse {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface GetWinnersParams {
  page: number;
  limit: number;
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export interface Winners {
  id: number;
  name: string;
  color: string;
  wins: number;
  bestTime: number;
}

export interface EngineSuccessResponse {
  velocity: number;
  distance: number;
  error?: boolean;
  stopped?: boolean;
}

export interface EngineErrorResponse {
  id: number;
  velocity: number;
  distance: number;
  error: boolean;
  errorMessage: string;
}

export type EngineResponse = EngineSuccessResponse & { id: number };

export type EngineResult = EngineResponse | EngineErrorResponse;

export type { EngineResult as EngineResultType };

export type EngineMutation = (arg: number) => Promise<EngineResponse | undefined>;

export interface DriveEngineSuccessResponse {
  id: number;
  success: boolean;
}

export interface DriveEngineErrorResponse {
  id: number;
  success: boolean;
}

export type DriveEngineResponse = DriveEngineSuccessResponse & { id: number };

export type EngineMutationDefinition = MutationDefinition<
  number,
  ApiBuilder,
  "Engine" | "Cats" | "Winners",
  EngineResponse,
  "api"
>;
