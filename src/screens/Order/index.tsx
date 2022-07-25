import { BackButton } from "~/components/BackButton";
import { RadioButton } from "~/components/RadioButton";
import { Container, Header, Photo, Sizes } from "./styles";

export const Order: React.FC = () => {
  return (
    <Container behavior="position" enabled>
      <Header>
        <BackButton />
      </Header>

      <Photo
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-744b6.appspot.com/o/pizzas%2F1658774286076.png?alt=media&token=6dde05c5-b294-4dcd-9951-d26960bfdef1",
        }}
      />

      <Sizes>
        <RadioButton title="Pequena" />
        <RadioButton title="Média" selected />
        <RadioButton title="Grande" />
      </Sizes>
    </Container>
  );
};
