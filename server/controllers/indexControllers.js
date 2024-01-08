const { catchAsyncError } = require("../middlewares/catchAsyncError");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../utils/nodemailer");
const { createToken } = require("../utils/createToken");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// callback functions of indexRoutes

// sign_up
exports.sign_up = catchAsyncError(async (req, res, next) => {
  const payload = await new userModel(req.body).save();
  req.session.user = payload._id;
  createToken(payload, 201, res);
});

// sign_in
exports.sign_in = catchAsyncError(async (req, res, next) => {
  const payload = await userModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!payload)
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  const isMatch = payload.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong credential"), 500);
  req.session.user = payload._id;
  createToken(payload, 200, res);
});

// send_forget_password_email
exports.send_forget_password_email = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findOne({ email: req.body.email }).exec();
  if (!payload)
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  const forgetPasswordToken = Math.floor(Math.random() * 9000 + 1000);
  payload.forgetPasswordToken = forgetPasswordToken;
  await payload.save();
  sendEmail(req, res, next, forgetPasswordToken);
});

// update_forget_password
exports.update_forget_password = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findOne({ email: req.body.email }).exec();
  if (!payload)
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  if (payload.forgetPasswordToken === req.body.otp) {
    payload.forgetPasswordToken = 0;
    payload.password = req.body.newPassword;
    await payload.save();
  } else {
    return next(new ErrorHandler("Invalid OTP! Please try again", 500));
  }
  res.status(200).json({
    success: true,
    message: "Password changed successfully!",
  });
});

// clear_forget_password_token
exports.clear_forget_password_token = catchAsyncError(
  async (req, res, next) => {
    const payload = await userModel.findOne({ email: req.body.email }).exec();
    payload.forgetPasswordToken = 0;
    await payload.save();
    res.status(200).json({
      success: true,
    });
  }
);

// account_details
exports.account_details = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).exec();
  res.status(200).json({
    success: true,
    payload: payload,
  });
});

//authentication_details
exports.authentication_details = catchAsyncError(async (req, res, next) => {
  if (req.cookies.token) {
    res.status(200).json({
      success: true,
      message: "User is authenticated",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "User authentication token expired",
    });
  }
});

// update_profile_details
exports.update_profile_details = catchAsyncError(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "User profile updated successfully!",
  });
});

// upload_profile_image
exports.upload_profile_image = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).exec();
  const file = req.files.profileImage;
  const modifiedFileName = `dailydoer@user-profile-${Date.now()}${path.extname(
    file.name
  )}`;
  if (payload.profileimage.fileId !== "") {
    await imagekit.deleteFile(payload.profileimage.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  payload.profileimage = { fileId, url };
  payload.save();
  res.status(200).json({
    success: true,
    message: "User profileimage uploaded successfully!",
    url: url,
  });
});

// reset_password
exports.reset_password = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).select("+password").exec();
  const isMatch = payload.comparePassword(req.body.oldPassword);
  if (!isMatch)
    return next(
      new ErrorHandler("Your old password is invalid! Please try again"),
      500
    );
  payload.password = req.body.newPassword;
  await payload.save();
  res.status(200).json({
    success: true,
    message: "Your password updated successfully!",
  });
});

// create_task
exports.create_task = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).exec();
  payload.tasks.push({
    ...req.body,
    addedOn: new Date(Date.now()).toLocaleDateString(),
    id: uuidv4(),
  });
  await payload.save();
  res.status(201).json({
    success: true,
    message: "Task created successfully!",
  });
});

// update_task
exports.update_task = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).exec();
  const taskIndex = payload.tasks.findIndex((i) => i.id === req.params.id);
  payload.tasks[taskIndex] = {
    ...payload.tasks[taskIndex],
    ...req.body,
  };
  await payload.save();
  res.status(200).json({
    success: true,
    message: "Task updated successfully!",
  });
});

// delete_task
exports.delete_task = catchAsyncError(async (req, res, next) => {
  const payload = await userModel.findById(req.id).exec();
  const filteredTasks = payload.tasks.filter((i) => i.id !== req.params.id);
  payload.tasks = filteredTasks;
  await payload.save();
  res.status(200).json({
    success: true,
    message: "Task deleted successfully!",
  });
});

// delete_account
exports.delete_account = catchAsyncError(async (req, res, next) => {
  await userModel.deleteOne({ _id: req.id }).exec();

  res.clearCookie("token").status(200).json({
    success: true,
    message: "Your account deleted successfully",
  });
});

// sign_out
exports.sign_out = catchAsyncError(async (req, res, next) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({
        success: false,
        message: "Session erroe",
      });
    } else {
      res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.cookie("connect.sid", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
      console.log(req.session);
    }
  });
});
