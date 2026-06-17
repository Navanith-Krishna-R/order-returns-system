const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  if (err.name === "ValidationError" || err.code === 11000) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
