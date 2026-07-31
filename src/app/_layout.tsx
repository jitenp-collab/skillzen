import StatusBarComponent from "@/components/common/Statusbar";
import { store } from "@/redux/store";
import { theme } from "@/utils/theme/Theme";

import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBarComponent />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
