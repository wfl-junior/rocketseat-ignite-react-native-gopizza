import { Feather } from "@expo/vector-icons";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { PizzaDTO } from "~/DTOs/PizzaDTO";
import {
  Container,
  Content,
  Description,
  Details,
  Identification,
  Image,
  Line,
  Name,
} from "./styles";

export interface ProductData
  extends Pick<PizzaDTO, "name" | "imageUrl" | "description"> {
  id: string;
}

interface ProductCardProps extends RectButtonProps {
  data: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, ...props }) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Content {...props}>
        <Image source={{ uri: data.imageUrl }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>

            <Feather
              name="chevron-right"
              size={18}
              color={colors.secondary[900]}
            />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
};
