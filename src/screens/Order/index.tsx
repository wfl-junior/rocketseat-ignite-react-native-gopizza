import { useState } from "react";
import { ScrollView } from "react-native";
import { BackButton } from "~/components/BackButton";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { RadioButton } from "~/components/RadioButton";
import { PIZZA_SIZES } from "~/utils/pizzaSizes";
import {
  Container,
  Content,
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

export const Order: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <Container behavior="position" enabled>
      <Content>
        <Header>
          <BackButton />
        </Header>

        <Photo
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-744b6.appspot.com/o/pizzas%2F1658774286076.png?alt=media&token=6dde05c5-b294-4dcd-9951-d26960bfdef1",
          }}
        />

        <Form>
          <Title>Gauchesca</Title>
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
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Total: R$10,00</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </Content>
    </Container>
  );
};
