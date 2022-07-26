import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { Fragment, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { BackButton } from "~/components/BackButton";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Loading } from "~/components/Loading";
import { RadioButton } from "~/components/RadioButton";
import { PizzaDTO } from "~/DTOs/PizzaDTO";
import { formatPrice } from "~/utils/formatPrice";
import { PIZZA_SIZES } from "~/utils/pizzaSizes";
import {
  Container,
  Content,
  ErrorText,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from "./styles";

export interface OrderNavigationParams {
  id: string;
}

export const Order: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pizza, setPizza] = useState<PizzaDTO | null>(null);
  const [selectedSize, setSelectedSize] =
    useState<keyof PizzaDTO["prices"]>("M");
  const [tableNumber, setTableNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const { params } = useRoute();
  const { id } = params as OrderNavigationParams;

  const amount = useMemo((): string => {
    let amount = 0;

    if (pizza) {
      amount = Number(pizza.prices[selectedSize]) * Number(quantity);
    }

    return formatPrice(amount);
  }, [pizza, selectedSize, quantity]);

  useEffect(() => {
    firestore()
      .collection<PizzaDTO>("pizzas")
      .doc(id)
      .get()
      .then(document => {
        const data = document.data()!;
        setPizza(data);
      })
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <Container>
      <Content>
        <Header>
          <BackButton />
        </Header>

        {isLoading ? (
          <View style={{ flex: 1, marginTop: 24 }}>
            <Loading />
          </View>
        ) : pizza ? (
          <Fragment>
            <Photo source={{ uri: pizza.imageUrl }} />

            <Form>
              <Title>{pizza.name}</Title>
              <Label>Selecione um tamanho</Label>

              <Sizes>
                {PIZZA_SIZES.map(size => (
                  <RadioButton
                    key={size.id}
                    title={size.title}
                    selected={selectedSize === size.id}
                    onPress={() => setSelectedSize(size.id)}
                  />
                ))}
              </Sizes>

              <FormRow>
                <InputGroup>
                  <Label>Número da mesa</Label>

                  <Input
                    keyboardType="numeric"
                    value={tableNumber}
                    onChangeText={setTableNumber}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Quantidade</Label>

                  <Input
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </InputGroup>
              </FormRow>

              <Price>Total: {amount}</Price>

              <Button title="Confirmar pedido" />
            </Form>
          </Fragment>
        ) : (
          <ErrorText>Não foi possível buscar os dados do pedido.</ErrorText>
        )}
      </Content>
    </Container>
  );
};
