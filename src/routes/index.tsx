import { NavigationContainer } from "@react-navigation/native";
import { Order } from "~/screens/Order";

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Order />
    </NavigationContainer>
  );
};
