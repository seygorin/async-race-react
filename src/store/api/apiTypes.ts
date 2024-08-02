import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

export type ApiBuilder = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
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

export type DeleteCatResponse = {};

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
  wins: number;
  time: number;
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
  wins: number;
  name: string;
  color: string;
  bestTime: number;
}

export interface EngineSuccessResponse {
  velocity: number;
  distance: number;
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

export type EngineMutation = (arg: number) => Promise<EngineResult>;

export function handleApiError<T extends MockResponse>(
  error: ApiError,
  mockResponse: T,
): HandleApiErrorResponse<T>;

// Определение типа для мутаций двигателя
export type EngineMutationDefinition = MutationDefinition<
  number,
  ApiBuilder,
  "Engine" | "Cats" | "Winners",
  EngineResponse,
  "api"
>;

export interface DriveEngineSuccessResponse {
  success: boolean;
}

export interface DriveEngineErrorResponse {
  id: number;
  success: boolean;
}

export type DriveEngineResponse = DriveEngineSuccessResponse & { id: number };

type EngineMutationResult = {
  data?: DriveEngineResponse;
  error?: FetchBaseQueryError | SerializedError;
};

type EngineMutation = (id: number) => Promise<EngineMutationResult>;
