import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Loading, Title } from "./styles";

export type ButtonType = "primary" | "secondary";

interface ButtonProps extends RectButtonProps {
  title: string;
  type?: ButtonType;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = "primary",
  isLoading = false,
  ...props
}) => (
  <Container type={type} enabled={!isLoading} {...props}>
    {isLoading ? <Loading /> : <Title>{title}</Title>}
  </Container>
);
