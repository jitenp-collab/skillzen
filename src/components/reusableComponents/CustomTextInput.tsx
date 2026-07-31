import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { PasswordHideIcon, PasswordshowIcon } from "../../assets/svg/SvgIcons";
import { theme } from "../../utils/theme/Theme";

import type { CustomTextInputProps } from "@/utils/types/Apptypes";
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

  const passwordIcon = showPassword ? (
    <PasswordshowIcon color={theme.colors.muted} />
  ) : (
    <PasswordHideIcon color={theme.colors.muted} />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          error && styles.errorBorder,
          isFocused && styles.focusedBorder,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          style={styles.input}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={theme.colors.placeholder}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />

        {isPassword ? (
          <AppButton
            icon={passwordIcon}
            width="10%"
            backgroundColor={theme.colors.transparent}
            onPress={() => setShowPassword((previous) => !previous)}
          />
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {helperText && !error ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 13,
  },

  label: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },

  inputContainer: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 7,
    backgroundColor: theme.colors.inputBackground,
  },

  focusedBorder: {
    borderColor: theme.colors.primary,
  },

  errorBorder: {
    borderColor: theme.colors.danger,
  },

  input: {
    flex: 1,
    height: "100%",
    color: theme.colors.text,
    fontSize: 14,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  leftIcon: {
    marginRight: 8,
  },

  errorText: {
    color: theme.colors.danger,
    fontSize: 11,
    marginTop: 4,
  },

  helperText: {
    color: theme.colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
});
