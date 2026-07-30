import { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { PasswordshowIcon, PasswordHideIcon } from "../../assets/svg/SvgIcons";
import { theme } from "../../utils/theme/Theme";
import { CustomTextInputProps } from "@/utils/types/Apptypes";


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
    );
  }
);

CustomTextInput.displayName = "CustomTextInput";

export default CustomTextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.small,
    marginBottom: theme.spacing.xs,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
  },
  inputContainerFocused: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    paddingLeft: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 4,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.caption,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    color: theme.colors.muted,
    fontSize: theme.fontSize.caption,
    marginTop: theme.spacing.xs,
  },
});