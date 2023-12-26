class JWTError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = null) {
    super(message);
    this.statusCode = statusCode;
    stack = null;
  }
}

export default JWTError;
