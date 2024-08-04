import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export type ApiBuilder = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  NonNullable<unknown>,
  FetchBaseQueryMeta
>;

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
