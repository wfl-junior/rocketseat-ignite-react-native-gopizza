import { MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import happyEmoji from "~/assets/happy.png";
import { ProductCard, ProductData } from "~/components/ProductCard";
import { Search } from "~/components/Search";
import { PizzaDTO } from "~/DTOs/PizzaDTO";
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
  const [search, setSearch] = useState("");
  const [pizzas, setPizzas] = useState<ProductData[]>([]);

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    const unsubscribe = firestore()
      .collection<PizzaDTO>("pizzas")
      .orderBy("nameInsensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(document => ({
          id: document.id,
          ...document.data(),
        }));

        setPizzas(data);
      }, console.warn);

    return unsubscribe;
  }

  useEffect(() => {
    return fetchPizzas("");
  }, []);

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

      <Search
        onSearch={() => {}}
        onClear={() => {}}
        value={search}
        onChangeText={setSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <ScrollView>
        {pizzas.map(pizza => (
          <ProductCard key={pizza.id} data={pizza} />
        ))}
      </ScrollView>
    </Container>
  );
};
