import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import happyEmoji from "~/assets/happy.png";
import { ProductCard } from "~/components/ProductCard";
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

      <ProductCard
        data={{
          id: "1",
          name: "Margherita",
          description: "Mussarela, manjericão fresco,parmesão e tomate.",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/gopizza-744b6.appspot.com/o/pizzas%2F1658763880596.png?alt=media&token=eec6feb2-1efe-47bd-ac83-d9d07885b0ce",
        }}
      />
    </Container>
  );
};
