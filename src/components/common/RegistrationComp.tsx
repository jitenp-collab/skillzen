import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GoogleIcon } from "../../assets/svg/SvgIcons";
import AppButton from "../reusableComponents/AppButton";
import AppTextInput from "../reusableComponents/CustomTextInput";

import { theme } from "@/utils/theme/Theme";
import type {
  RegistrationCompProps,
  RegistrationFormErrors,
  RegistrationFormValues,
} from "@/utils/types/Apptypes";

const initialValues: RegistrationFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationComp = ({
  onRegister,
  onLoginPress,
  onGooglePress,
}: RegistrationCompProps) => {
  const [formValues, setFormValues] =
    useState<RegistrationFormValues>(initialValues);

  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof RegistrationFormValues, value: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const validationErrors: RegistrationFormErrors = {};

    const trimmedName = formValues.fullName.trim();
    const trimmedEmail = formValues.email.trim();

    if (!trimmedName) {
      validationErrors.fullName = "Full name is required";
    }

    if (!trimmedEmail) {
      validationErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmedEmail)) {
        validationErrors.email = "Enter a valid email address";
      }
    }

    if (!formValues.password) {
      validationErrors.password = "Password is required";
    }

    if (!formValues.confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (formValues.password !== formValues.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleCreateAccount = () => {
    if (!validateForm()) {
      return;
    }

    const cleanedValues: RegistrationFormValues = {
      ...formValues,
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim().toLowerCase(),
    };

    setIsSubmitting(true);

    try {
      onRegister?.(cleanedValues);
    } finally {
      setIsSubmitting(false);
    }
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
              value={formValues.fullName}
              error={errors.fullName}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => updateField("fullName", value)}
            />

            <AppTextInput
              label="Email"
              placeholder="Enter your email"
              value={formValues.email}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => updateField("email", value)}
            />

            <AppTextInput
              label="Password"
              placeholder="Enter your password"
              value={formValues.password}
              error={errors.password}
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onChangeText={(value) => updateField("password", value)}
            />

            <AppTextInput
              label="Confirm password"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
              error={errors.confirmPassword}
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleCreateAccount}
              onChangeText={(value) => updateField("confirmPassword", value)}
            />

            <AppButton
              title={isSubmitting ? "Creating Account..." : "Create Account"}
              height={46}
              fontSize={15}
              disabled={isSubmitting}
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
    maxWidth: 420,
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
    marginTop: 2,
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
