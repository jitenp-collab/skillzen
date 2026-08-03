import { createSlice } from "@reduxjs/toolkit";

import {
  completeGetStarted,
  googleSignInUser,
  loadAppData,
  loginUser,
  logoutUser,
  registerUser,
  updateProfilePhoto,
} from "./actions";

import type { GlobalState } from "@/utils/types/Apptypes";

const initialState: GlobalState = {
  currentUser: null,
  getStartedCompleted: false,
  isLoading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Load app data
      .addCase(loadAppData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loadAppData.fulfilled, (state, action) => {
        state.currentUser = action.payload.currentUser;

        state.getStartedCompleted = action.payload.getStartedCompleted;

        state.isLoading = false;
      })

      .addCase(loadAppData.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || "Unable to load app data";
      })

      // Complete Get Started
      .addCase(completeGetStarted.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(completeGetStarted.fulfilled, (state) => {
        state.getStartedCompleted = true;
        state.isLoading = false;
      })

      .addCase(completeGetStarted.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || "Unable to complete Get Started";
      })

      // Google Sign-In
      .addCase(googleSignInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(googleSignInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(googleSignInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Google Sign-In failed";
      })

      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || "Registration failed";
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || "Login failed";
      })

      // Update profile photo
      .addCase(updateProfilePhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(updateProfilePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Unable to update profile photo";
      })

      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isLoading = false;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || "Logout failed";
      });
  },
});

export const { clearError } = globalSlice.actions;

export default globalSlice.reducer;
