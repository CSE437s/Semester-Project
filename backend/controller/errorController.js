const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpireError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_DEV_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_DEV_ENV === "production") {
    let error = { ...err };
    if (error.name === "JsonwebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpireError();
    sendErrorProd(error, res);
  }
};
