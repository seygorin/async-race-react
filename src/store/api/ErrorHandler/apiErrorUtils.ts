import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ApiError = FetchBaseQueryError | SerializedError;

export interface MockResponse {
  [key: string]: unknown;
}

export interface HandleApiErrorResponse<T extends MockResponse> extends T {
  error: boolean;
  errorMessage: string;
}

const handleApiError = <T extends MockResponse>(
  error: ApiError,
  mockResponse: T,
): HandleApiErrorResponse<T> => {
  let errorMessage = "An unknown error occurred";

  if ("status" in error) {
    if (error.status === "FETCH_ERROR") {
      errorMessage = "Failed to connect to the server";
    } else if (typeof error.status === "number") {
      errorMessage = `Error ${error.status}`;
      if (
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
      ) {
        errorMessage = error.data.message as string;
      }
    }
  }

  console.error("API Error:", errorMessage);

  return { error: true, errorMessage, ...mockResponse };
};

export default handleApiError;
