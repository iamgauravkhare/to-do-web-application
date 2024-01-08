import axios from "@/utils/axios";
import {
  updateUserData,
  removeUserData,
  addError,
  addNotification,
  removeError,
  removeNotification,
  addLoading,
} from "../reducers";

export const asyncUserSignUp = (signUpData) => async (dispatch, getState) => {
  try {
    // console.log("This is use of getState - " + getState().user.loading);
    dispatch(addLoading());
    await axios.post("/sign-up", signUpData);
    dispatch(asyncGetUserData());
    dispatch(addNotification("Account created successfully"));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncUserSignIn = (signInData) => async (dispatch, getState) => {
  try {
    let data = getState().userSlice;
    console.log(data);
    dispatch(addLoading());
    await axios.post("/sign-in", signInData);
    dispatch(asyncGetUserData());
    dispatch(addNotification("Signed in successfully"));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncSendForgetPasswordEmail =
  (email) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/forget-password-email", email);
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

export const asyncClearForgetPasswordToken =
  (email) => async (dispatch, getState) => {
    try {
      await axios.post("/clear-forget-password-token", email);
    } catch (error) {
      dispatch(addError(error.response.data.message));
    }
  };

export const asyncUpdateForgetPassword =
  (updatedPasswordData) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/update-forget-password",
        updatedPasswordData
      );
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

export const asyncGetUserData = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/account-details");
    console.log(data);
    dispatch(updateUserData(data.payload));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncGetUserAuthenticated = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/authentication-details");
    if (data.success === true) {
      return true;
    } else {
      return false;
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

export const asyncResetPassword =
  (updatedPasswordData) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/reset-password", updatedPasswordData);
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

export const asyncCreateTask = (taskData) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/create-task", taskData);
    dispatch(asyncGetUserData());
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

export const asyncUserSignOut = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/sign-out");
    dispatch(removeUserData());
    dispatch(removeError());
    dispatch(removeNotification());
    dispatch(addNotification(data.message));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};

export const asyncUserDeleteAccount = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/delete-account");
    dispatch(removeUserData());
    dispatch(addNotification(data.message));
  } catch (error) {
    dispatch(addError(error.response.data.message));
  }
};
