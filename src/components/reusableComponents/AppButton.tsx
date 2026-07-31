import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/utils/theme/Theme";
import type { AppButtonProp } from "@/utils/types/Apptypes";

const AppButton = ({
  title,
  onPress,
  width = "100%",
  height = 52,
  backgroundColor = theme.colors.primary,
  textColor = theme.colors.background,
  borderRadius = 9,
  fontSize = 20,
  icon,
  iconPosition = "right",
  disabled = false,
  style,
  textStyle,
  fontweight = "800",
  hitSlop,
}: AppButtonProp) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.button,
        {
          width,
          height,
          backgroundColor,
          borderRadius,
          opacity: pressed || disabled ? 0.75 : 1,
        },
        style,
      ]}
    >
      {icon && iconPosition === "left" && (
        <View style={styles.iconContainer}>{icon}</View>
      )}

      {title ? (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize,
              fontWeight: fontweight,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      ) : null}

      {icon && iconPosition === "right" && (
        <View style={styles.iconContainer}>{icon}</View>
      )}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  text: {
    textAlign: "center",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
