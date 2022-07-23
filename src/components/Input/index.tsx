import { TextInputProps } from "react-native";
import { Container } from "./styles";

export type InputType = "primary" | "secondary";

interface InputProps extends TextInputProps {
  type?: InputType;
}

export const Input: React.FC<InputProps> = ({ type = "primary", ...props }) => (
  <Container type={type} autoCapitalize="none" autoCorrect={false} {...props} />
);
