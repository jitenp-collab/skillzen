import { createAsyncThunk } from "@reduxjs/toolkit";
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


// Load saved app data
export const loadAppData = createAsyncThunk("global/loadAppData", async () => {
  const registeredUsers: User[] = (await loadData(REGISTERED_USERS_KEY)) ?? [];
  const currentUser: User | null = (await loadData(CURRENT_USER_KEY)) ?? null;

  const getStartedCompleted: boolean =
    (await loadData(GET_STARTED_KEY)) ?? false;

  // console.log("Total registered users:", registeredUsers.length);
  // console.log("Current logged-in user:", currentUser);
  // console.log("Get Started completed:", getStartedCompleted);


  return {
    currentUser,
    getStartedCompleted,
    
  };
});

// Complete Get Started
export const completeGetStarted = createAsyncThunk(
  "global/completeGetStarted",
  async () => {
    await StoreData(GET_STARTED_KEY, true);
    console.log("Get Started completed");
    return true;
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "global/registerUser",
  async (values: RegistrationFormValues) => {
    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];

    const email = values.email.trim().toLowerCase();
    const userAlreadyExists = registeredUsers.find(
      (user) => user.email === email
    );

    if (userAlreadyExists) {
      // console.log("Registration failed: Email already exists");

      throw new Error("This email is already registered");
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullName: values.fullName.trim(),
      email,
      password: values.password,
      userData: [],
    };

    const updatedUsers = [...registeredUsers, newUser];

    await StoreData(REGISTERED_USERS_KEY, updatedUsers);
    await StoreData(CURRENT_USER_KEY, newUser);

    // console.log("User registered successfully:", newUser);
    // console.log("Total registered users:", updatedUsers.length);
    // console.log("Current logged-in user:", newUser);

    return newUser;
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "global/loginUser",
  async (values: LoginFormValues) => {
    const registeredUsers: User[] =
      (await loadData(REGISTERED_USERS_KEY)) ?? [];

    const email = values.email.trim().toLowerCase();

    const user = registeredUsers.find(
      (item) => item.email === email && item.password === values.password
    );

    if (!user) {
      // console.log("Login failed: Invalid email or password");

      throw new Error("Invalid email or password");
    }

    await StoreData(CURRENT_USER_KEY, user);

    // console.log("User logged in successfully:", user);
    // console.log("Total registered users:", registeredUsers.length);

    return user;
  }
);

// Logout user
export const logoutUser = createAsyncThunk("global/logoutUser", async () => {
  const currentUser: User | null = (await loadData(CURRENT_USER_KEY)) ?? null;

  await removeData(CURRENT_USER_KEY);

  // console.log("User logged out:", currentUser);
  // console.log("Current logged-in user: null");

  return null;
});


export const GetCategories = createAsyncThunk(
  "get/categories",
  async () => {
    try {
      return require("../assets/data/categories.json");
    } catch (error) {
      console.log("Error to fetch Categories");
      return [];
    }
  }
);