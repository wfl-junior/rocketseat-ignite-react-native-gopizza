import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import happyEmoji from "~/assets/happy.png";
import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  SignOutButton,
} from "./styles";

export const Home: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <SignOutButton>
          <MaterialIcons name="logout" size={24} color={colors.title} />
        </SignOutButton>
      </Header>
    </Container>
  );
};
