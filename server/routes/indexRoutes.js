const express = require("express");
const router = express.Router();
const { isAuthencated } = require("../middlewares/auth");
const {
  sign_up,
  sign_in,
  send_forget_password_email,
  clear_forget_password_token,
  update_forget_password,
  account_details,
  authentication_details,
  update_profile_details,
  upload_profile_image,
  reset_password,
  create_task,
  update_task,
  mark_task_completed,
  delete_task,
  delete_account,
  sign_out,
} = require("../controllers/indexControllers");

/**@api /api/v1 POST sign-up */
router.post("/sign-up", sign_up);

/**@api /api/v1 POST sign-in */
router.post("/sign-in", sign_in);

/**@api /api/v1 POST forget-password-email */
router.post("/forget-password-email", send_forget_password_email);

/**@api /api/v1 POST update-forget-password */
router.post("/update-forget-password", update_forget_password);

/**@api /api/v1 POST clear-forget-password-token */
router.post("/clear-forget-password-token", clear_forget_password_token);

/**@api /api/v1 GET account-details */
router.get("/account-details", isAuthencated, account_details);

/**@api /api/v1 GET authentication-details */
router.get("/authentication-details", authentication_details);

/**@api /api/v1 POST update-profile-details */
router.post("/update-profile-details", isAuthencated, update_profile_details);

/**@api /api/v1 POST upload-profile-image */
router.post("/upload-profile-image", isAuthencated, upload_profile_image);

/**@api /api/v1 POST reset-password */
router.post("/reset-password", isAuthencated, reset_password);

/**@api /api/v1 POST create-task */
router.post("/create-task", isAuthencated, create_task);

/**@api /api/v1 POST update-task */
router.post("/update-task/:id", isAuthencated, update_task);

/**@api /api/v1 POST mark_task_completed */
router.post("/mark-task-completed/:id", isAuthencated, mark_task_completed);

/**@api /api/v1 POST delete-task */
router.post("/delete-task/:id", isAuthencated, delete_task);

/**@api /api/v1 POST sign-out */
router.post("/sign-out", isAuthencated, sign_out);

/**@api /api/v1 GET delete-account */
router.get("/delete-account", isAuthencated, delete_account);

module.exports = router;
