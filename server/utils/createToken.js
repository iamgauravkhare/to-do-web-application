exports.createToken = (payload, statusCode, res) => {
  const token = payload.getJWTToken();
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true });
};
