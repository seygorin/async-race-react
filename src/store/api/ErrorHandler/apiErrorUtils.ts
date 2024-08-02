import { ApiError, MockResponse, HandleApiErrorResponse } from "../apiTypes";

const handleApiError = <T extends MockResponse>(
  error: ApiError,
  mockResponse: T,
): HandleApiErrorResponse<T> => {
  let errorMessage = "An unknown error occurred";

  if (error.status === "FETCH_ERROR") {
    errorMessage = "Failed to connect to the server";
  } else if (error.data) {
    errorMessage = error.data.message || `Error ${error.status}`;
  }

  console.error("API Error:", errorMessage);

  return { error: true, errorMessage, ...mockResponse };
};

export default handleApiError;
