import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";

import { PasswordshowIcon, PasswordHideIcon } from "../../assets/svg/SvgIcons";
import { theme } from "../../utils/theme/Theme";
import { CustomTextInputProps } from "@/utils/types/Apptypes";
import AppButton from "./AppButton";

const AppTextInput = ({
  label,
  error,
  helperText,
  leftIcon,
  containerStyle,
  isPassword = false,
  inputContainerStyle,

  onFocus,
  onBlur,

  ...props
}: CustomTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,

          isFocused && styles.focusedBorder,

          error && styles.errorBorder,

          inputContainerStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={styles.input}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={theme.colors.placeholder}
          onFocus={(e) => {
            setIsFocused(true);

            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);

            onBlur?.(e);
          }}
          {...props}
        />

        {isPassword && (
          // <TouchableOpacity
          //   onPress={() => setShowPassword(!showPassword)}
          //   style={styles.eyeButton}
          // >
          //   {showPassword ? (
          //     <PasswordshowIcon color={theme.colors.muted} />
          //   ) : (
          //     <PasswordHideIcon color={theme.colors.muted} />
          //   )}
          // </TouchableOpacity>
          <AppButton
            backgroundColor="#ffffff00"
            onPress={() => setShowPassword(!showPassword)}
            width="10%"
            icon={
              showPassword ? (
                <PasswordshowIcon color={theme.colors.muted} />
              ) : (
                <PasswordHideIcon color={theme.colors.muted} />
              )
            }
          />
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.inputBackground,
  },

  focusedBorder: {
    borderColor: theme.colors.primary,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    paddingHorizontal: 10,
  },

  leftIcon: {
    marginRight: 8,
  },

  eyeButton: {
    padding: 5,
  },

  errorBorder: {
    borderColor: theme.colors.danger,
  },

  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 5,
  },

  helperText: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
});
