import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { Alert } from "react-native";
import { ASYNC_STORAGE_USERS_KEY } from "~/utils/constants";

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  user: User | null;
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
  const [user, setUser] = useState<AuthContextData["user"]>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

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
          .collection<Omit<User, "id">>("users")
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
        ).catch(error => {
          console.warn(error);
          Alert.alert("Não foi possível persistir os dados.");
        });

        ASYNC_STORAGE_USERS_KEY;
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
        user,
        signIn,
        isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
