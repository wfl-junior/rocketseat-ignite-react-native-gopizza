import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BackButton } from "~/components/BackButton";
import { Photo } from "~/components/Photo";
import { PriceInput } from "~/components/PriceInput";
import {
  Container,
  DeleteLabel,
  Header,
  PickImageButton,
  Title,
  Upload,
} from "./styles";

export const Product: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

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

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Container>
        <KeyboardAvoidingView behavior="position" enabled>
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

          <PriceInput size="P" />
          <PriceInput size="M" />
          <PriceInput size="G" />
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};
