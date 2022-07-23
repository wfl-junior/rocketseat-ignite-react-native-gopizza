import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Fragment, useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { SignIn } from "~/screens/SignIn";
import { theme } from "~/theme";
import { AuthContextProvider } from "./contexts/AuthContext";

export const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync({
          DMSans_400Regular,
          DMSerifDisplay_400Regular,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const handleLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <GestureHandlerRootView
            onLayout={handleLayoutRootView}
            style={{ flex: 1 }}
          >
            <SignIn />
          </GestureHandlerRootView>
        </AuthContextProvider>
      </ThemeProvider>
    </Fragment>
  );
};
