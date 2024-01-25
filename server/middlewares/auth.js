const jwt = require("jsonwebtoken");
const { catchAsyncError } = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
exports.isAuthencated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("Token not found! Please sign in to continue", 401)
    );
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  if (!id) {
    return next(
      new ErrorHandler(
        "Token verification failed! Please sign in to continue",
        401
      )
    );
  }
  req.id = id;
  next();
});
