//A calss that inhertes from the global Error class

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode.stat}`.startsWith("4") ? "fail" : "error";
    this.IsOpreationel = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
