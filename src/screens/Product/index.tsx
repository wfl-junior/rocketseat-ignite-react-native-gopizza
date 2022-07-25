import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BackButton } from "~/components/BackButton";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Photo } from "~/components/Photo";
import { PriceInput } from "~/components/PriceInput";
import { PizzaDTO } from "~/DTOs/PizzaDTO";
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

export interface ProductNavigationParams {
  id?: string;
}

export const Product: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id } = params as ProductNavigationParams;

  useEffect(() => {
    if (id) {
      firestore()
        .collection<PizzaDTO>("pizzas")
        .doc(id)
        .get()
        .then(document => {
          const data = document.data();

          if (data) {
            setImage(data.imageUrl);
            setImagePath(data.imagePath);
            setName(data.name);
            setDescription(data.description);
            setPriceSizeP(data.prices.P);
            setPriceSizeM(data.prices.M);
            setPriceSizeG(data.prices.G);
          }
        })
        .catch(error => {
          console.warn(error);
          Alert.alert("Pizza", "Não foi possível buscar os dados da pizza.");
        });
    }
  }, [id]);

  async function handleDeleteProduct() {
    await firestore().collection<PizzaDTO>("pizzas").doc(id).delete();
    await storage().ref(imagePath).delete();
    navigate("home");
  }

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

    setIsLoading(true);

    try {
      const fileName = Date.now();
      const fileExtension = image.split(".").pop() || "png";
      const reference = storage().ref(`/pizzas/${fileName}.${fileExtension}`);

      await reference.putFile(image);
      const imageUrl = await reference.getDownloadURL();

      await firestore()
        .collection<PizzaDTO>("pizzas")
        .add({
          name,
          nameInsensitive: name.toLowerCase().trim(),
          description,
          prices: {
            P: priceSizeP,
            M: priceSizeM,
            G: priceSizeG,
          },
          imageUrl,
          imagePath: reference.fullPath,
        });

      navigate("home");
    } catch (error) {
      setIsLoading(false);
      console.warn(error);
      Alert.alert("Cadastro", "Não foi possível cadastrar a pizza.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton />

          <Title>Cadastrar</Title>

          {id ? (
            <TouchableOpacity onPress={handleDeleteProduct}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 47.3 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />

          {!id && (
            <PickImageButton
              title="Carregar"
              type="secondary"
              onPress={handlePickImage}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>

            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>

              <MaxCharacters>
                {description.length} de 60 caracteres
              </MaxCharacters>
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

          {!id && (
            <Button
              title="Cadastrar pizza"
              isLoading={isLoading}
              onPress={handleAddProduct}
            />
          )}
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};
