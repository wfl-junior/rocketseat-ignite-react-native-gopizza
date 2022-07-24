import { TextInputProps } from "react-native";
import { Container, Input, Label, Size } from "./styles";

interface PriceInputProps extends TextInputProps {
  size: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({ size, ...props }) => (
  <Container>
    <Size>
      <Label>{size}</Label>
    </Size>

    <Label>R$</Label>

    <Input keyboardType="numeric" {...props} />
  </Container>
);
