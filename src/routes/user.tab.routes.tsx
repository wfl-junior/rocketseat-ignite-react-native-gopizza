import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { Home } from "~/screens/Home";
import { Orders } from "~/screens/Orders";

const { Navigator, Screen } = createBottomTabNavigator();

export const UserTabRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary[900],
        tabBarInactiveTintColor: colors.secondary[400],
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="orders" component={Orders} />
    </Navigator>
  );
};
