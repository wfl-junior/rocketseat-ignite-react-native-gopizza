import { NavigationContainer } from "@react-navigation/native";
import { Orders } from "~/screens/Orders";

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Orders />
    </NavigationContainer>
  );
};
