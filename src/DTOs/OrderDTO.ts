import { OrderStatus } from "~/components/OrderCard";
import { PizzaDTO } from "./PizzaDTO";

export interface OrderDTO {
  quantity: string;
  amount: string;
  status: OrderStatus;
  waiterId: string;
  size: keyof PizzaDTO["prices"];
  pizza: Pick<PizzaDTO, "name" | "imageUrl">;
}
