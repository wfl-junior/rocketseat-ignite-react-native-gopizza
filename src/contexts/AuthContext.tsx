import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { UserDTO } from "~/DTOs/UserDTO";
import { ASYNC_STORAGE_USERS_KEY } from "~/utils/constants";

interface User extends UserDTO {
  id: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  isSigningIn: boolean;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextData["user"]>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_USERS_KEY)
      .then(data => {
        if (data) {
          const user = JSON.parse(data) as User;
          setUser(user);
        }
      })
      .catch(console.warn)
      .finally(() => setIsSigningIn(false));
  }, []);

  const signIn: AuthContextData["signIn"] = useCallback(
    async (email, password) => {
      if (!email || !password) {
        return Alert.alert("Login", "Informe o e-mail e a senha.");
      }

      setIsSigningIn(true);

      try {
        const { user } = await auth().signInWithEmailAndPassword(
          email,
          password,
        );

        const profile = await firestore()
          .collection<UserDTO>("users")
          .doc(user.uid)
          .get();

        const { name, isAdmin } = profile.data()!;

        const userData: User = {
          id: user.uid,
          name,
          isAdmin,
        };

        setUser(userData);

        AsyncStorage.setItem(
          ASYNC_STORAGE_USERS_KEY,
          JSON.stringify(userData),
        ).catch(console.warn);
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

  const signOut: AuthContextData["signOut"] = useCallback(async () => {
    try {
      setUser(null);
      await auth().signOut();
      AsyncStorage.removeItem(ASYNC_STORAGE_USERS_KEY).catch(console.warn);
    } catch (error) {
      console.warn(error);
      Alert.alert("Logout", "Não foi possível sair");
    }
  }, []);

  const forgotPassword: AuthContextData["forgotPassword"] = useCallback(
    async email => {
      if (!email) {
        return Alert.alert("Esqueci minha senha", "Informe o e-mail.");
      }

      try {
        await auth().sendPasswordResetEmail(email);

        Alert.alert(
          "Esqueci minha senha",
          "Enviamos um link no seu e-mail para redefinir sua senha.",
        );
      } catch (error) {
        console.warn(error);

        Alert.alert(
          "Esqueci minha senha",
          "Não foi possível enviar o e-mail para redefinir a senha.",
        );
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isSigningIn,
        signOut,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
