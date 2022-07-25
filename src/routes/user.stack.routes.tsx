import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "~/contexts/AuthContext";
import { Home } from "~/screens/Home";
import { Order } from "~/screens/Order";
import { Product } from "~/screens/Product";
import { UserTabRoutes } from "./user.tab.routes";

const { Navigator, Screen, Group } = createNativeStackNavigator();

export const UserStackRoutes: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user!.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="order" component={Order} />
        </Group>
      )}
    </Navigator>
  );
};
