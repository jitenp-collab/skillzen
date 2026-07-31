import { ComponentType, ReactNode } from "react";
import {
  DimensionValue,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export type GetStartedIconProps = {
  size?: number;
  color: string;
  strokeWidth?: number;
};

export type IconComponent = ComponentType<GetStartedIconProps>;

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: IconComponent;
  iconColor: string;
  iconBackground: string;
};

export type OnboardingPage = {
  id: string;
  title: string;
  highlightedTitle: string;
  description: string;
  features: Feature[];
};

export type AppButtonProp = {
  title?: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontSize?: number;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  borderwidth?: number;
  bordercolor?: string;
  textStyle?: StyleProp<TextStyle>;
  fontweight?: TextStyle["fontWeight"];
  hitSlop?: number;
};

export type CustomTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export type RegistrationFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegistrationCompProps = {
  onRegister?: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onLoginPress?: () => void;
  onGooglePress?: () => void;
};

export type LoginErrorsProps = {
  email?: string;
  password?: string;
};
