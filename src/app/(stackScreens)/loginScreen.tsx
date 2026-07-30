import { StyleSheet, View } from "react-native";
import  { useState } from "react";
import CustomTextInput from "@/components/reusableComponents/CustomTextInput";

const loginScreen = () => {
  const [password, setPassword] = useState("");

  return (
    <View>
      <CustomTextInput
        label="Password"
        placeholder="Enter your password"
        isPassword
        value={password}
        onChangeText={setPassword}
        // error={passwordError}
      />
    </View>
  );
};

export default loginScreen;

const styles = StyleSheet.create({});