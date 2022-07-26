import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
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
  const isAdmin = user!.isAdmin;

  useEffect(() => {
    let query:
      | FirebaseFirestoreTypes.CollectionReference<OrderDTO>
      | FirebaseFirestoreTypes.Query<OrderDTO> =
      firestore().collection<OrderDTO>("orders");

    if (!isAdmin) {
      query = query.where("waiterId", "==", userId);
    }

    const unsubscribe = query.onSnapshot(snapshot => {
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
  }, [userId, isAdmin]);

  function handleChangePizzaStatus(id: OrderState["id"]) {
    Alert.alert(
      "Pedido",
      `Confirmar que a pizza ${isAdmin ? "está pronta" : "foi entregue"}?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            firestore()
              .collection<OrderDTO>("orders")
              .doc(id)
              .update({ status: isAdmin ? "Pronto" : "Entregue" })
              .catch(error => {
                console.warn(error);

                Alert.alert(
                  "Pedido",
                  "Não foi possível atualizar o status do pedido.",
                );
              });
          },
        },
      ],
    );
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
              onPress={() => handleChangePizzaStatus(order.id)}
              disabled={
                isAdmin
                  ? order.status !== "Preparando"
                  : order.status !== "Pronto"
              }
            />
          )}
        />
      )}
    </Container>
  );
};
