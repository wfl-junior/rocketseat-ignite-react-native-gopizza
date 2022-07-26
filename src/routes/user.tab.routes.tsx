import firestore from "@react-native-firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { BottomMenu } from "~/components/BottomMenu";
import { useAuthContext } from "~/contexts/AuthContext";
import { OrderDTO } from "~/DTOs/OrderDTO";
import { Home } from "~/screens/Home";
import { Orders } from "~/screens/Orders";

const { Navigator, Screen } = createBottomTabNavigator();

export const UserTabRoutes: React.FC = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState("0");
  const { user } = useAuthContext();

  const userId = user!.id;
  const isAdmin = user!.isAdmin;

  useEffect(() => {
    let query = firestore()
      .collection<OrderDTO>("orders")
      .where("status", "==", isAdmin ? "Preparando" : "Pronto");

    if (!isAdmin) {
      query = query.where("waiterId", "==", userId);
    }

    const unsubscribe = query.onSnapshot(snapshot => {
      setNotifications(snapshot.docs.length.toString());
    }, console.warn);

    return unsubscribe;
  }, [userId, isAdmin]);

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
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          ),
        }}
      />

      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title="Pedidos"
              color={color}
              notifications={notifications}
            />
          ),
        }}
      />
    </Navigator>
  );
};
