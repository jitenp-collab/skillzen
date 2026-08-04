import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GoogleIcon } from "../../assets/svg/SvgIcons";
import AppButton from "../reusableComponents/AppButton";
import AppTextInput from "../reusableComponents/CustomTextInput";

import { theme } from "@/utils/theme/Theme";
import type { RegistrationCompProps } from "@/utils/types/Apptypes";

const RegistrationComp = ({
  onRegister,
  onLoginPress,
  onGooglePress,
}: RegistrationCompProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleCreateAccount = () => {
    if (!validateForm()) {
      return;
    }

    onRegister?.({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>

            <Text style={styles.subtitle}>Start your learning journey.</Text>
          </View>

          <View style={styles.form}>
            <AppTextInput
              label="Full name"
              placeholder="Enter full name"
              value={fullName}
              error={fullNameError}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => {
                setFullName(value);
                setFullNameError("");
              }}
            />

            <AppTextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => {
                setEmail(value);
                setEmailError("");
              }}
            />

            <AppTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              error={passwordError}
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => {
                setPassword(value);
                setPasswordError("");
              }}
            />

            <AppTextInput
              label="Confirm password"
              placeholder="Confirm your password"
              value={confirmPassword}
              error={confirmPasswordError}
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleCreateAccount}
              onChangeText={(value) => {
                setConfirmPassword(value);
                setConfirmPasswordError("");
              }}
            />

            <AppButton
              title="Create Account"
              height={46}
              fontSize={15}
              onPress={handleCreateAccount}
              style={styles.createAccountButton}
            />
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>or continue with</Text>

            <View style={styles.divider} />
          </View>

          <AppButton
            title="Continue with Google"
            icon={<GoogleIcon />}
            iconPosition="left"
            height={46}
            backgroundColor={theme.colors.surface}
            textColor={theme.colors.text}
            borderRadius={10}
            fontSize={14}
            fontweight="600"
            onPress={onGooglePress}
            style={styles.googleButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>

            <AppButton
              title="Login"
              width="auto"
              height={28}
              backgroundColor={theme.colors.transparent}
              textColor={theme.colors.primary}
              fontSize={13}
              fontweight="700"
              onPress={onLoginPress}
              hitSlop={6}
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationComp;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  content: {
    width: "100%",
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 23,
  },

  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },

  form: {
    width: "100%",
  },

  createAccountButton: {
    marginTop: 10,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 19,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },

  dividerText: {
    color: theme.colors.muted,
    fontSize: 12,
    paddingHorizontal: 11,
  },

  googleButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
  },

  accountText: {
    color: theme.colors.muted,
    fontSize: 13,
  },

  loginButton: {
    paddingHorizontal: 5,
  },
});
