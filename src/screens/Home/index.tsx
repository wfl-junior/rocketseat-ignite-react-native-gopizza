import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import happyEmoji from "~/assets/happy.png";
import { Search } from "~/components/Search";
import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  SignOutButton,
  Title,
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

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>
    </Container>
  );
};
