import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useState } from "react";
import CustomTextInput from "@/components/reusableComponents/CustomTextInput";
import { theme } from "@/utils/theme/Theme";
import AppButton from "../reusableComponents/AppButton";
import { GoogleIcon } from "../../assets/svg/SvgIcons";
import { router } from "expo-router";
import { LoginErrorsProps } from "@/utils/types/Apptypes";

import { useDispatch } from "react-redux";
import { googleSignInUser, loginUser } from "@/redux/actions";
import type { AppDispatch } from "@/redux/store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [errors, setErrors] = useState<LoginErrorsProps>({});

  const validate = (): boolean => {
    const newErrors: LoginErrorsProps = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (text: string) => {
    setemail(text);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleGoogleSignIn = async () => {
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

  const handleSignIn = async () => {
    if (!validate()) {
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: email.trim().toLowerCase(),
          password,
        })
      ).unwrap();

      router.replace("/(tabs)");
    } catch (error) {
      console.log("Login error:", error);

      const message =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "Unable to login";

      Alert.alert("Login failed", message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
      >
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Text style={styles.learinig}>Sign in to continue learinig</Text>

        <CustomTextInput
          label="email"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomTextInput
          label="Password"
          placeholder="Enter your password"
          isPassword
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
        />
        <View style={styles.forgotePassword}>
          <AppButton
            backgroundColor="#ffffff00"
            title="Forgot Password ?"
            textColor={theme.colors.muted}
            fontSize={13}
            fontweight="300"
            style={styles.forgotePassword}
            height={20}
          />
        </View>
        <AppButton
          title="Sign In"
          height={46}
          fontSize={15}
          onPress={handleSignIn}
        />
        <View style={styles.box}>
          <View style={styles.line}></View>
          <Text style={styles.or}>or continue with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.box2}>
          <AppButton
            height={46}
            icon={<GoogleIcon />}
            iconPosition="left"
            backgroundColor={theme.colors.surface}
            borderwidth={1}
            bordercolor={theme.colors.border}
            title="Continue with google"
            textColor={theme.colors.text}
            fontweight="600"
            fontSize={14}
            borderRadius={10}
            onPress={handleGoogleSignIn}
          />
        </View>
        <View style={styles.box3}>
          <Text style={styles.donacount}>Don't have an acount? </Text>
          <AppButton
            backgroundColor="#df1f1f00"
            title="Registration"
            textColor={theme.colors.primary}
            fontSize={13}
            fontweight="700"
            height={20}
            width="auto"
            onPress={() => router.replace("/RegistrationScreen")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    // alignItems: "center",
  },
  welcome: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 2,
  },

  donacount: {
    textAlign: "center",
    color: theme.colors.muted,
  },

  learinig: {
    textAlign: "center",
    color: theme.colors.muted,
    marginBottom: 23,
    marginTop: 6,
  },
  forgotePassword: {
    marginStart: "auto",
    marginBottom: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  or: {
    color: theme.colors.muted,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.divider,
    width: "33%",
  },
  box2: {
    alignItems: "center",
    justifyContent: "center",
  },
  box3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
