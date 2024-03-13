import axios from "@/utils/axios";
import {
  updateUserData,
  removeUserData,
  addError,
  addNotification,
  removeError,
  removeNotification,
  addLoading,
  removeLoading,
} from "../reducers";

export const asyncUserSignUp = (signUpData, router) => async (dispatch) => {
  try {
    await axios.post("/sign-up", signUpData);
    await dispatch(asyncGetUserData());
    router.push("/dashboard");
  } catch (error) {
    dispatch(addError("Error! Something went wrong"));
    dispatch(removeLoading());
    return;
  }
  dispatch(addNotification("Sign up successfull"));
};

export const asyncUserSignIn = (signInData, router) => async (dispatch) => {
  try {
    await axios.post("/sign-in", signInData);
    await dispatch(asyncGetUserData());
    router.push("/dashboard");
  } catch (error) {
    dispatch(addError(error.response.data.message));
    dispatch(removeLoading());
    return;
  }
  dispatch(addNotification("Signed in successfully"));
};

export const asyncSendForgetPasswordEmail =
  (email, showSetForgetPasswordHandler, timeOut, useremail) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post("/forget-password-email", email);
      dispatch(addNotification(data.message));
      if (data.success === true) {
        showSetForgetPasswordHandler();
        timeOut(useremail);
      }
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
    dispatch(removeLoading());
  };

export const asyncClearForgetPasswordToken =
  (email) => async (dispatch, getState) => {
    try {
      await axios.post("/clear-forget-password-token", email);
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncUpdateForgetPassword =
  (updatedPasswordData, showSignInHandler) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/update-forget-password",
        updatedPasswordData
      );
      dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
      if (data.success === true) {
        showSignInHandler();
      } else {
        return false;
      }
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
    dispatch(removeLoading());
  };

export const asyncGetUserData = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/account-details");
    dispatch(updateUserData(data.payload));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncGetUserAuthenticated =
  (router) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get("/authentication-details");
      if (data.success === true) {
        dispatch(addLoading());
        await dispatch(asyncGetUserData());
        router.push("/dashboard");
        setTimeout(() => {
          dispatch(removeLoading());
        }, 2000);
      } else {
        router.push("/");
      }
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncUpdateProfileDetails =
  (updatedProfileData) => async (dispatch, getState) => {
    try {
      await axios.post("/update-profile-details", updatedProfileData);
      dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
      if (data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncUploadProfileImage =
  (profileImageData) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/upload-profile-image",
        profileImageData
      );
      await dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
    dispatch(removeLoading());
  };

export const asyncResetPassword =
  (updatedPasswordData, ProfileHandler) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/reset-password", updatedPasswordData);
      await dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
      if (data.success === true) {
        dispatch(removeLoading());
        ProfileHandler();
      }
      return;
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
    dispatch(removeLoading());
  };

export const asyncCreateTask = (taskData) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/create-task", taskData);
    await dispatch(asyncGetUserData());

    dispatch(addNotification(data.message));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncUpdateTask =
  (updatedTaskData, taskId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        `/update-task/${taskId}`,
        updatedTaskData
      );
      await dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncMarkTaskCompleted =
  (taskId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`/mark-task-completed/${taskId}`);
      dispatch(asyncGetUserData());
      dispatch(addNotification(data.message));
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncDeleteTask = (taskId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/delete-task/${taskId}`);
    dispatch(asyncGetUserData());
    dispatch(addNotification(data.message));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncUserSignOut = (router) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/sign-out");
    router.push("/");
    dispatch(removeUserData());
    dispatch(removeError());
    dispatch(removeNotification());
    dispatch(addNotification(data.message));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncUserDeleteAccount =
  (router) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get("/delete-account");
      router.push("/");
      dispatch(removeUserData());
      dispatch(addNotification(data.message));
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };
