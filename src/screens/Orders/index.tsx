import { FlatList } from "react-native";
import { ItemSeparator } from "~/components/ItemSeparator";
import { OrderCard } from "~/components/OrderCard";
import { Container, Header, Title } from "./styles";

export const Orders: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={["1", "2", "3"]}
        keyExtractor={order => order}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: order, index }) => (
          <OrderCard
            index={index}
            name="Gauchesca"
            status="Preparando"
            table={1}
            quantity={1}
            imageUrl="https://firebasestorage.googleapis.com/v0/b/gopizza-744b6.appspot.com/o/pizzas%2F1658774286076.png?alt=media&token=6dde05c5-b294-4dcd-9951-d26960bfdef1"
          />
        )}
      />
    </Container>
  );
};
