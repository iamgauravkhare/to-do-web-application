const jwt = require("jsonwebtoken");
const { catchAsyncError } = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { json } = require("express");
exports.isAuthencated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please sign in to continue", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  next();
});
