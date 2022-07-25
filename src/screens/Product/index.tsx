import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BackButton } from "~/components/BackButton";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Photo } from "~/components/Photo";
import { PriceInput } from "~/components/PriceInput";
import {
  Container,
  DeleteLabel,
  Form,
  Header,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
  PickImageButton,
  Title,
  Upload,
} from "./styles";

export const Product: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");

  async function handlePickImage() {
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status === PermissionStatus.GRANTED) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAddProduct() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    }

    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza.");
    }

    if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim()) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza.",
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton />

          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />

          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handlePickImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>

            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput
              size="P"
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />

            <PriceInput
              size="M"
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />

            <PriceInput
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAddProduct}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};
