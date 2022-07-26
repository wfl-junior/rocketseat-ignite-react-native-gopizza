import { PizzaDTO } from "~/DTOs/PizzaDTO";

interface PizzaSize {
  id: keyof PizzaDTO["prices"];
  title: string;
}

export const PIZZA_SIZES: PizzaSize[] = [
  {
    id: "P",
    title: "Pequena",
  },
  {
    id: "M",
    title: "Média",
  },
  {
    id: "G",
    title: "Grande",
  },
];
