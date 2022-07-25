import { MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
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

type Pizza = PizzaDTO & ProductData;
type UnsubscribeFn = () => void;

export const Home: React.FC = () => {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const unsubscribeRef = useRef<UnsubscribeFn>(null);
  const { navigate } = useNavigation();

  function fetchPizzas(value: string) {
    unsubscribeRef.current?.();
    const formattedValue = value.toLowerCase().trim();

    const unsubscribe = firestore()
      .collection<PizzaDTO>("pizzas")
      .orderBy("nameInsensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(
          (document): Pizza => ({
            id: document.id,
            ...document.data(),
          }),
        );

        setPizzas(data);
      }, console.warn);

    // @ts-ignore
    unsubscribeRef.current = unsubscribe;

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = fetchPizzas("");
    return unsubscribe;
  }, []);

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleClearSearch() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: Pizza["id"]) {
    navigate("product", { id });
  }

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
        onSearch={handleSearch}
        onClear={handleClearSearch}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={pizza => pizza.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: pizza }) => (
          <ProductCard data={pizza} onPress={() => handleOpen(pizza.id)} />
        )}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
};
