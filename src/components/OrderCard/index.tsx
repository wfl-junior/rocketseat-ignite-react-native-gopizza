import { TouchableOpacityProps } from "react-native";
import { OrderDTO } from "~/DTOs/OrderDTO";
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
  index: number;
  data: OrderDTO;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  index,
  data,
  ...props
}) => (
  <Container index={index} {...props}>
    <Image source={{ uri: data.pizza.imageUrl }} />

    <Name>{data.pizza.name}</Name>

    <Description>
      Mesa {data.tableNumber.padStart(2, "0")} • Qnt: {data.quantity}
    </Description>

    <StatusContainer status={data.status}>
      <StatusLabel status={data.status}>{data.status}</StatusLabel>
    </StatusContainer>
  </Container>
);
