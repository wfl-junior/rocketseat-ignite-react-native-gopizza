import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
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

  const userId = user!.id;

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
  }, [userId]);

  function handleDeliverPizza(id: OrderState["id"]) {
    Alert.alert("Pedido", "Confirmar que a pizza foi entregue?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          firestore().collection<OrderDTO>("orders").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }

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
            <OrderCard
              index={index}
              data={order}
              disabled={order.status !== "Pronto"}
              onPress={() => handleDeliverPizza(order.id)}
            />
          )}
        />
      )}
    </Container>
  );
};
