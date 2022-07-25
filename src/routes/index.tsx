import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "~/contexts/AuthContext";
import { SignIn } from "~/screens/SignIn";
import { UserStackRoutes } from "./user.stack.routes";

export const Routes: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
