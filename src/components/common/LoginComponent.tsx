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
import { GoogleIcon } from "../../assets/svg/SvgIcons";

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
            fontSize={13}
            fontweight="300"
            style={styles.forgotePassword}
            height={20}
          />
        </View>
        <AppButton title="Sign In" />
        <View style={styles.box}>
          <View style={styles.line}></View>
          <Text style={styles.or}>or continue with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.box2}>
          <AppButton
            icon={<GoogleIcon />}
            backgroundColor={theme.colors.surface}
            borderwidth={2}
            bordercolor={theme.colors.border}
            title="Continue with google"
            textColor={theme.colors.text}
            fontweight="500"
            fontSize={15}
          />
        </View>
        <View style={styles.box3}>
          <Text style={styles.learinig}>Don't have an acount? </Text>
          <AppButton
            backgroundColor="#df1f1f00"
            title="Sign Up"
            textColor={theme.colors.primary}
            fontSize={13}
            fontweight="400"
            height={20}
            width="15%"
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
    // marginBottom: 20,
  },
  forgotePassword: {
    marginStart: "auto",
    marginBottom: 15,
  },

  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
  },
  or: {
    // textAlign: "center",
    color: theme.colors.muted,
  },

  line: {
    borderBottomWidth: 0.5,
    borderColor: theme.colors.muted,
    width: "26%",
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
