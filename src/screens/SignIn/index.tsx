import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Container } from "./styles";

export const SignIn: React.FC = () => (
  <Container>
    <Input placeholder="E-mail" type="secondary" keyboardType="email-address" />
    <Input placeholder="Senha" type="secondary" secureTextEntry />
    <Button title="Entrar" type="secondary" />
  </Container>
);
