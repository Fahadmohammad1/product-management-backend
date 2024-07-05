class ApiError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}

export default ApiError;
