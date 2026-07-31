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
        },
        tabBarLabelStyle: {
          fontSize: 11,
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
