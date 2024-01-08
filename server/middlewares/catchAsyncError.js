exports.catchAsyncError = (e) => (req, res, next) => {
  Promise.resolve(e(req, res, next).catch(next));
};
