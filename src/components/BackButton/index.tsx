import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GestureResponderEvent, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

interface BackButtonProps extends TouchableOpacityProps {}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  ...props
}) => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  function handlePress(event: GestureResponderEvent) {
    onPress?.(event);
    goBack();
  }

  return (
    <Container onPress={handlePress} {...props}>
      <MaterialIcons name="chevron-left" size={18} color={colors.title} />
    </Container>
  );
};
