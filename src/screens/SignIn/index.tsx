import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import brandImage from "~/assets/brand.png";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import {
  Brand,
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Title,
} from "./styles";

export const SignIn: React.FC = () => (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <Content>
          <Brand source={brandImage} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            keyboardType="email-address"
          />

          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button title="Entrar" type="secondary" />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  </TouchableWithoutFeedback>
);
