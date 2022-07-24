import auth from "@react-native-firebase/auth";
import { createContext, useCallback, useContext, useState } from "react";
import { Alert } from "react-native";

interface AuthContextData {
  signIn: (email: string, password: string) => Promise<void>;
  isSigningIn: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signIn: AuthContextData["signIn"] = useCallback(
    async (email, password) => {
      if (!email || !password) {
        return Alert.alert("Login", "Informe o e-mail e a senha.");
      }

      setIsSigningIn(true);

      try {
        const account = await auth().signInWithEmailAndPassword(
          email,
          password,
        );

        console.log(account);
      } catch (error: any) {
        let errorMessage = "Não foi possível entrar.";

        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password": {
            errorMessage = "Credenciais inválidas.";
          }
          default: {
            console.warn(error);
          }
        }

        Alert.alert("Login", errorMessage);
      } finally {
        setIsSigningIn(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
