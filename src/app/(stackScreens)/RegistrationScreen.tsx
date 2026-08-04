import React from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

import RegistrationComp from "@/components/common/RegistrationComp";
import { googleSignInUser, registerUser } from "@/redux/actions";
import type { AppDispatch } from "@/redux/store";
import type { RegistrationFormValues } from "@/utils/types/Apptypes";

const RegistrationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (values: RegistrationFormValues) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Registration failed",
        error?.message || "Unable to register user"
      );
    }
  };

  const handleLoginPress = () => {
    router.replace("/loginScreen");
  };

  const handleGooglePress = async () => {
    try {
      await dispatch(googleSignInUser()).unwrap();
      router.replace("/(tabs)");
    } catch (error) {
      console.log("Google Sign-In error:", error);

      Alert.alert(
        "Google Sign-In failed",
        error instanceof Error ? error.message : "Unable to sign in with Google"
      );
    }
  };

  return (
    <RegistrationComp
      onRegister={handleRegister}
      onLoginPress={handleLoginPress}
      onGooglePress={handleGooglePress}
    />
  );
};

export default RegistrationScreen;
