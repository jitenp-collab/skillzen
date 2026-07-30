import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/utils/theme/Theme";
import { Props } from "@/utils/types/Apptypes";

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
  disabled = false,
  style,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          width,
          height,
          backgroundColor,
          borderRadius,
          opacity: pressed || disabled ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize,
          },
        ]}
      >
        {title}
      </Text>

      {icon && <View>{icon}</View>}
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
    fontWeight: "800",
  },
});
