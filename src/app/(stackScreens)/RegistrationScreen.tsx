import React from "react";
import { router } from "expo-router";

import RegistrationComp from "@/components/common/RegistrationComp";
import { RegistrationFormValues } from "@/utils/types/Apptypes";

const RegistrationScreen = () => {
  const handleRegister = (values: RegistrationFormValues) => {
    console.log("Registration values:", values);

    // Connect registration API here later.
  };

  const handleLoginPress = () => {
    router.replace("/loginScreen");
  };

  const handleGooglePress = () => {
    // Connect Google authentication here later.
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
