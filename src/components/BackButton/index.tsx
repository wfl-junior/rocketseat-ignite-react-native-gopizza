import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

interface BackButtonProps extends TouchableOpacityProps {}

export const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  const { colors } = useTheme();

  return (
    <Container {...props}>
      <MaterialIcons name="chevron-left" size={18} color={colors.title} />
    </Container>
  );
};
