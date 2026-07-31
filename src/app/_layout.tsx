import StatusBarComponent from "@/components/common/Statusbar";
import { theme } from "@/utils/theme/Theme";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBarComponent />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: theme.colors.background
          },
      
        }}
      />
    </SafeAreaProvider>
  );
};

export default _layout;

