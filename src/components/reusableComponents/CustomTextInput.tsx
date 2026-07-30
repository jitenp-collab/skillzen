import React, { useState } from "react";
import {
  View,
import { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { PasswordshowIcon, PasswordHideIcon } from "../../assets/svg/SvgIcons";
import { AppTextInputProps } from "@/utils/types/Apptypes";
import { theme } from "../../utils/theme/Theme";
import { CustomTextInputProps } from "@/utils/types/Apptypes";

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
}: AppTextInputProps) => {
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
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? (
              <PasswordshowIcon color={theme.colors.muted} />
            ) : (
              <PasswordHideIcon color={theme.colors.muted} />
            )}
          </TouchableOpacity>
        )}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      containerStyle,
      isPassword = false,
      secureTextEntry,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus: TextInputProps["onFocus"] = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps["onBlur"] = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const shouldHideText = isPassword ? !isPasswordVisible : secureTextEntry;

    const borderColor = error
      ? theme.colors.danger
      : isFocused
      ? theme.colors.primary
      : theme.colors.border;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            { borderColor },
            isFocused && styles.inputContainerFocused,
          ]}
        >
          {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.primary}
            secureTextEntry={shouldHideText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />

          {isPassword ? (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.rightIcon}
            >
              {isPasswordVisible ? (
                <PasswordHideIcon width={20} height={20} color={theme.colors.muted} />
              ) : (
                <PasswordshowIcon width={20} height={20} color={theme.colors.muted} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
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
