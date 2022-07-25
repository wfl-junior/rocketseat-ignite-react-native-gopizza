import { TouchableOpacityProps } from "react-native";
import { Container, Radio, Selected, Title } from "./styles";

interface RadioButtonProps extends TouchableOpacityProps {
  title: string;
  selected?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  title,
  selected = false,
  ...props
}) => (
  <Container selected={selected} {...props}>
    <Radio>{selected && <Selected />}</Radio>

    <Title>{title}</Title>
  </Container>
);
