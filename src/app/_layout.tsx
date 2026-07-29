import StatusBarComponent from "@/components/Statusbar";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBarComponent />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
};

export default _layout;