import { BackButton } from "~/components/BackButton";
import { Container, Header, Photo } from "./styles";

export const Order: React.FC = () => (
  <Container behavior="position" enabled>
    <Header>
      <BackButton />
    </Header>

    <Photo
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-744b6.appspot.com/o/pizzas%2F1658774286076.png?alt=media&token=6dde05c5-b294-4dcd-9951-d26960bfdef1",
      }}
    />
  </Container>
);
