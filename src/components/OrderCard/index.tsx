import { Container } from "./styles";

export type OrderStatus = "Preparando" | "Pronto" | "Entregue";

interface OrderCardProps {
  index: number;
  status: OrderStatus;
}

export const OrderCard: React.FC<OrderCardProps> = ({ index, status }) => (
  <Container index={index}></Container>
);
