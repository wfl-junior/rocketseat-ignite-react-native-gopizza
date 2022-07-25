import { NavigationContainer } from "@react-navigation/native";
import { UserStackRoutes } from "./user.stack.routes";

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
};
