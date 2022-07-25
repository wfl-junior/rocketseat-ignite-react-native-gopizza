import { TouchableOpacityProps } from "react-native";
import { PizzaDTO } from "~/DTOs/PizzaDTO";
import {
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
} from "./styles";

export type OrderStatus = "Preparando" | "Pronto" | "Entregue";

interface OrderCardProps extends TouchableOpacityProps {
  name: PizzaDTO["name"];
  imageUrl: PizzaDTO["imageUrl"];
  index: number;
  status: OrderStatus;
  table: number;
  quantity: number;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  name,
  imageUrl,
  index,
  status,
  table,
  quantity,
  ...props
}) => (
  <Container index={index} {...props}>
    <Image source={{ uri: imageUrl }} />

    <Name>{name}</Name>

    <Description>
      Mesa {table.toString().padStart(2, "0")} • Qnt: {quantity}
    </Description>

    <StatusContainer status={status}>
      <StatusLabel status={status}>{status}</StatusLabel>
    </StatusContainer>
  </Container>
);
