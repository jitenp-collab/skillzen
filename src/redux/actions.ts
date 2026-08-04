import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  GoogleOneTapSignIn,
  isCancelledResponse,
  isSuccessResponse,
} from "react-native-nitro-google-signin";

import { loadData, removeData, StoreData } from "@/services/AsynckStorage";

import type {
  LoginFormValues,
  RegistrationFormValues,
  User,
} from "@/utils/types/Apptypes";
import {
  CURRENT_USER_KEY,
  GET_STARTED_KEY,
  REGISTERED_USERS_KEY,
} from "@/utils/constants/AsyncStorageConfig";
import { webclientID } from "@/utils/constants/WebclientID";

GoogleOneTapSignIn.configure({
  webClientId: webclientID,
  autoSelectOnSignIn: false,
});

// Load current logged-in user and Get Started status
export const loadAppData = createAsyncThunk("global/loadAppData", async () => {
  const currentUser: User | null = (await loadData(CURRENT_USER_KEY)) ?? null;

  const getStartedCompleted: boolean =
    (await loadData(GET_STARTED_KEY)) ?? false;

  return {
    currentUser,
    getStartedCompleted,
  };
});

// Save that Get Started has been completed
export const completeGetStarted = createAsyncThunk(
  "global/completeGetStarted",
  async () => {
    await StoreData(GET_STARTED_KEY, true);

    return true;
  }
);

// Register using email and password
export const registerUser = createAsyncThunk(
  "global/registerUser",
  async (values: RegistrationFormValues) => {
    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];
    const email = values.email.trim().toLowerCase();
    const existingUser = registeredUsers.find((user) => user.email === email);
    if (existingUser?.loginType === "google") {
      throw new Error(
        "This email is registered with Google. Please use Google Sign-In."
      );
    }

    if (existingUser) {
      throw new Error("This email is already registered");
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullName: values.fullName.trim(),
      email,
      password: values.password,
      loginType: "email",
      userData: [],
    };

    const updatedUsers = [...registeredUsers, newUser];

    await StoreData(REGISTERED_USERS_KEY, updatedUsers);

    await StoreData(CURRENT_USER_KEY, newUser);

    console.log("Email user registered:", newUser);
    console.log("Total registered users:", updatedUsers.length);

    return newUser;
  }
);

// Login using email and password
export const loginUser = createAsyncThunk(
  "global/loginUser",
  async (values: LoginFormValues) => {
    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];

    const email = values.email.trim().toLowerCase();

    const user = registeredUsers.find((item) => item.email === email);

    if (!user) {
      throw new Error("No account found with this email");
    }

    if (user.loginType === "google") {
      throw new Error(
        "This account was created with Google. Please use Google Sign-In."
      );
    }

    if (user.password !== values.password) {
      throw new Error("Incorrect password");
    }

    await StoreData(CURRENT_USER_KEY, user);

    console.log("Email user logged in:", user);

    return user;
  }
);

// Register or login using Google
export const googleSignInUser = createAsyncThunk(
  "global/googleSignInUser",
  async () => {
    await GoogleOneTapSignIn.checkPlayServices();

    const response = await GoogleOneTapSignIn.presentExplicitSignIn();

    if (isCancelledResponse(response)) {
      throw new Error("Google Sign-In was cancelled");
    }

    if (!isSuccessResponse(response)) {
      throw new Error("Google Sign-In failed");
    }

    const googleUser = response.data.user;

    if (!googleUser.email) {
      throw new Error("Google account email was not found");
    }

    const email = googleUser.email.trim().toLowerCase();

    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];

    let user = registeredUsers.find((item) => item.email === email);

    // The same email was previously registered
    // using email and password.
    if (user?.loginType === "email") {
      throw new Error(
        "This email is registered with email and password. Please use normal Sign In."
      );
    }

    // New Google user
    if (!user) {
      user = {
        id: googleUser.id,
        fullName: googleUser.name ?? "Google User",
        email,
        googlePhoto: googleUser.photo ?? undefined,
        loginType: "google",
        userData: [],
      };

      const updatedUsers = [...registeredUsers, user];

      await StoreData(REGISTERED_USERS_KEY, updatedUsers);

      console.log("New Google user registered:", user);

      console.log("Total registered users:", updatedUsers.length);
    } else {
      console.log("Existing Google user logged in:", user);
    }

    await StoreData(CURRENT_USER_KEY, user);

    return user;
  }
);

export const updateProfilePhoto = createAsyncThunk(
  "global/updateProfilePhoto",
  async (photo: string | null) => {
    const currentUser: User | null = (await loadData(CURRENT_USER_KEY)) ?? null;

    if (!currentUser) {
      throw new Error("No logged-in user found");
    }

    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];

    const updatedUser: User = {
      ...currentUser,
      photo: photo ?? undefined,
    };

    const updatedUsers = registeredUsers.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );

    await StoreData(REGISTERED_USERS_KEY, updatedUsers);

    await StoreData(CURRENT_USER_KEY, updatedUser);

    console.log("Profile photo updated:", photo);

    return updatedUser;
  }
);

// Logout current user
export const logoutUser = createAsyncThunk("global/logoutUser", async () => {
  const currentUser: User | null = (await loadData(CURRENT_USER_KEY)) ?? null;

  if (currentUser?.loginType === "google") {
    await GoogleOneTapSignIn.signOut();
  }

  await removeData(CURRENT_USER_KEY);

  console.log("User logged out:", currentUser);

  return null;
});

export const GetCategories = createAsyncThunk("get/categories", async () => {
  try {
    return require("../assets/data/categories.json");
  } catch (error) {
    console.log("Error to fetch Categories");
    return [];
  }
});

export const SelectCaogery = createAsyncThunk(
  "get/catogery",
  async (Catogery: string) => {
    try {
      switch (Catogery) {
        case "React Native CLI":
          return require("../assets/data/topics/reactNativeTopics.json");

        case "JavaScript":
          return require("../assets/data/topics/javascriptTopics.json");

        case "TypeScript":
          return require("../assets/data/topics/typescriptTopics.json");

        case "Python":
          return require("../assets/data/topics/pythonTopics.json");

        case "Node.js":
          return require("../assets/data/topics/nodejsTopics.json");

        case "Redux":
          return require("../assets/data/topics/reduxTopics.json");

        case "Expo":
          return require("../assets/data/topics/expoTopics.json");

        case "Git":
          return require("../assets/data/topics/gitTopics.json");

        default: return require("../assets/data/topics/reactNativeTopics.json");
      }
    } catch (error) {
      console.log("Error to fetch Category");
      return require("../assets/data/topics/reactNativeTopics.json");
    }
  }
);