import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  error: [],
  isAuthenticated: false,
  notification: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },

    removeUserData: (state, action) => {
      state.userData = null;
      state.isAuthenticated = false;
    },

    addError: (state, action) => {
      state.error.push(action.payload);
    },

    removeError: (state, action) => {
      state.error = [];
    },

    addNotification: (state, action) => {
      state.notification.push(action.payload);
    },

    removeNotification: (state, action) => {
      state.notification = [];
    },

    addLoading: (state, action) => {
      state.loading = true;
    },

    removeLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  updateUserData,
  removeUserData,
  addError,
  removeError,
  addNotification,
  removeNotification,
  addLoading,
  removeLoading,
} = userSlice.actions;

export default userSlice.reducer;
