const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_NOT_FOUND = 404;
const STATUS_TOO_MANY_REQUESTS = 429;

const handleApiError = (error, mockResponse) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`API Error (${status}):`, data);
    if (
      status === STATUS_INTERNAL_SERVER_ERROR ||
      status === STATUS_NOT_FOUND ||
      status === STATUS_TOO_MANY_REQUESTS
    ) {
      return { error: true, ...mockResponse };
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    return { error: true, ...mockResponse };
  } else {
    console.error("Error setting up request:", error.message);
    return { error: true, ...mockResponse };
  }
  return { error: true, ...mockResponse };
};

export default handleApiError;
