import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ItemSeparator } from "~/components/ItemSeparator";
import { Loading } from "~/components/Loading";
import { OrderCard } from "~/components/OrderCard";
import { useAuthContext } from "~/contexts/AuthContext";
import { OrderDTO } from "~/DTOs/OrderDTO";
import { Container, Header, Title } from "./styles";

interface OrderState extends OrderDTO {
  id: string;
}

export const Orders: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderState[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection<OrderDTO>("orders")
      .where("waiterId", "==", user!.id)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(
          (document): OrderState => ({
            id: document.id,
            ...document.data(),
          }),
        );

        setOrders(data);
        setIsLoading(false);
      }, console.warn);

    return unsubscribe;
  }, [user!.id]);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={order => order.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item: order, index }) => (
            <OrderCard index={index} data={order} />
          )}
        />
      )}
    </Container>
  );
};
