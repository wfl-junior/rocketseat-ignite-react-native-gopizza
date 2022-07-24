import { TouchableOpacity } from "react-native";
import { BackButton } from "~/components/BackButton";
import { Photo } from "~/components/Photo";
import {
  Container,
  DeleteLabel,
  Header,
  PickImageButton,
  Title,
  Upload,
} from "./styles";

export const Product: React.FC = () => (
  <Container behavior="position" enabled>
    <Header>
      <BackButton />

      <Title>Cadastrar</Title>

      <TouchableOpacity>
        <DeleteLabel>Deletar</DeleteLabel>
      </TouchableOpacity>
    </Header>

    <Upload>
      <Photo uri="" />
      <PickImageButton title="Carregar" type="secondary" />
    </Upload>
  </Container>
);
