import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import brandImage from "~/assets/brand.png";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useAuthContext } from "~/contexts/AuthContext";
import {
  Brand,
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Title,
} from "./styles";

export const SignIn: React.FC = () => {
  const { signIn, isSigningIn, forgotPassword } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signIn(email, password);
  }

  async function handleForgotPassword() {
    await forgotPassword(email);
  }

  return (
    <Container>
      <Content>
        <KeyboardAvoidingView behavior="position" enabled>
          <Brand source={brandImage} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isSigningIn}
          />
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
};
