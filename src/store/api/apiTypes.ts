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

export interface HandleApiErrorResponse<T> extends MockResponse {
  error: boolean;
  errorMessage: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
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
  wins: number;
  time: number;
}

export interface DeleteWinnerParams {
  id: number;
}

export interface UpdateWinnerParams {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinnerResponse {
  id: number;
  wins: number;
  time: number;
}

export interface GetWinnersParams {
  page: number;
  limit: number;
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}
