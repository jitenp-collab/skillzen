import {
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

const LoginComponent = () => {
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

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
        <Text style={styles.learinig}>Login to continue learinig</Text>

        <CustomTextInput
          label="email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setemail}
        />
        <CustomTextInput
          label="Password"
          placeholder="Enter your password"
          isPassword
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.forgotePassword}>
          <AppButton
            backgroundColor="#ffffff00"
            title="Forgot Password ?"
            textColor={theme.colors.muted}
            fontSize={15}
            fontweight="300"
            style={styles.forgotePassword}
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
    padding: 15,
    justifyContent: "center",
  },
  welcome: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 25,
    fontWeight: "400",
    marginBottom: 2,
  },

  learinig: {
    textAlign: "center",
    color: theme.colors.muted,
  },
  forgotePassword: {
    marginStart: "auto",
  },
});
