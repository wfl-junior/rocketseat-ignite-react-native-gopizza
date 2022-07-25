export interface PizzaDTO {
  name: string;
  nameInsensitive: string;
  description: string;
  prices: {
    P: string;
    M: string;
    G: string;
  };
  imageUrl: string;
  imagePath: string;
}
