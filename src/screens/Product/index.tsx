import { TouchableOpacity } from "react-native";
import { Container, DeleteLabel, Header, Title } from "./styles";

export const Product: React.FC = () => (
  <Container behavior="position" enabled>
    <Header>
      <Title>Cadastrar</Title>

      <TouchableOpacity>
        <DeleteLabel>Deletar</DeleteLabel>
      </TouchableOpacity>
    </Header>
  </Container>
);
