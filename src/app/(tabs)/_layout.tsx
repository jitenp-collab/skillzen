import { Tabs } from "expo-router";
import { theme } from "@/utils/theme/Theme";
import { tabConfig } from "../../utils/constants/tabConfig";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,

          // iOS shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,

          // Android shadow
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      {tabConfig.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}