import { useTheme } from "styled-components/native";
import { LoadingIndicator } from "./styles";

export const Loading: React.FC = () => {
  const { colors } = useTheme();

  return <LoadingIndicator size={28} color={colors.secondary[900]} />;
};
