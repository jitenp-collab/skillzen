import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { theme } from "@/utils/theme/Theme";
import { ClearIcon, SearchIcon } from "../../assets/svg/SvgIcons";
import { SearchBarProps } from "@/utils/types/Apptypes";
import AppButton from "./AppButton";

const CustomeSearch = ({
  value,
  onChangeText,
  onClear,
  onFocusChange,
  placeholder = "Search",
  containerStyle,
  autoFocus,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocusChange?.(true);
  }, [onFocusChange]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onFocusChange?.(false);
  }, [onFocusChange]);

  const handleClear = useCallback(() => {
    onChangeText("");
    onClear?.();
    setIsFocused(false);
    onFocusChange?.(false);
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, [onChangeText, onClear, onFocusChange]);


  useEffect(() => {
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur();
      setIsFocused(false);
      onFocusChange?.(false);
    });

    return () => hideSub.remove();
  }, [onFocusChange]);

  useEffect(() => {
    if (!isFocused) return;

    const backSub = BackHandler.addEventListener("hardwareBackPress", () => {
      inputRef.current?.blur();
      Keyboard.dismiss();
      setIsFocused(false);
      onFocusChange?.(false);
      return true;
    });

    return () => backSub.remove();
  }, [isFocused, onFocusChange]);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        containerStyle,
      ]}
    >
      <SearchIcon
        color={isFocused ? theme.colors.primary : theme.colors.muted}
      />

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoFocus={autoFocus}
      />

      {isFocused && (
        <AppButton
          icon={<ClearIcon color={theme.colors.muted} />}
          onPress={handleClear}
          hitSlop={8}
          width={24}
          height={24}
          backgroundColor="transparent"
          borderRadius={12}
          style={styles.clearButton}
        />
      )}
    </View>
  );
};

export default CustomeSearch;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    gap: theme.spacing.sm,
  },
  containerFocused: {
    borderColor: theme.colors.primary,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
    padding: 0,
  },
  clearButton: {
    padding: 2,
  },
});
