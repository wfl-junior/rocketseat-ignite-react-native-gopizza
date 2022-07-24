import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
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
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};
