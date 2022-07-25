import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Button, ClearButton, Container, Input, InputArea } from "./styles";

interface SearchProps extends TextInputProps {
  onSearch: () => void;
  onClear: () => void;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  onClear,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar..." {...props} />

        <ClearButton onPress={onClear}>
          <Feather name="x" size={16} color="black" />
        </ClearButton>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={colors.title} />
      </Button>
    </Container>
  );
};
