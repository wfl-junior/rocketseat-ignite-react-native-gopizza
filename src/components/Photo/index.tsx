import { Image, Placeholder, PlaceholderTitle } from "./styles";

interface PhotoProps {
  uri: string | null;
}

export const Photo: React.FC<PhotoProps> = ({ uri }) => {
  if (uri) {
    return <Image source={{ uri }} />;
  }

  return (
    <Placeholder>
      <PlaceholderTitle>
        Nenhuma foto{"\n"}
        carregada
      </PlaceholderTitle>
    </Placeholder>
  );
};
