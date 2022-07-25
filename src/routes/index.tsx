import { NavigationContainer } from "@react-navigation/native";
import { UserTabRoutes } from "./user.tab.routes";

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <UserTabRoutes />
    </NavigationContainer>
  );
};
