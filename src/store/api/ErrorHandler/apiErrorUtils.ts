const handleApiError = (error, mockResponse) => {
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
