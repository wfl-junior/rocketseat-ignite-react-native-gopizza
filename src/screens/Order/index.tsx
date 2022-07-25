import { BackButton } from "~/components/BackButton";
import { Container, Header } from "./styles";

export const Order: React.FC = () => (
  <Container behavior="position" enabled>
    <Header>
      <BackButton />
    </Header>
  </Container>
);
