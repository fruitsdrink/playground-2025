import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const isAuthGroup = segments[0] === "auth";

    if (!user && !isAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && isAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments, router, isLoadingUser]);

  return <>{children}</>;
}

const lightTheme = {
  colors: {
    primary: "rgb(71, 85, 182)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(223, 224, 255)",
    onPrimaryContainer: "rgb(0, 13, 95)",
    secondary: "rgb(91, 93, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(224, 225, 249)",
    onSecondaryContainer: "rgb(24, 26, 44)",
    tertiary: "rgb(119, 83, 108)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 215, 240)",
    onTertiaryContainer: "rgb(45, 18, 39)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(227, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(118, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 240, 244)",
    inversePrimary: "rgb(187, 195, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(246, 243, 251)",
      level2: "rgb(240, 238, 249)",
      level3: "rgb(235, 233, 247)",
      level4: "rgb(233, 231, 246)",
      level5: "rgb(229, 228, 245)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(47, 48, 56, 0.4)",
  },
};

const darkTheme = {
  colors: {
    primary: "rgb(187, 195, 255)",
    onPrimary: "rgb(17, 34, 134)",
    primaryContainer: "rgb(45, 60, 156)",
    onPrimaryContainer: "rgb(223, 224, 255)",
    secondary: "rgb(196, 197, 221)",
    onSecondary: "rgb(45, 47, 66)",
    secondaryContainer: "rgb(67, 69, 89)",
    onSecondaryContainer: "rgb(224, 225, 249)",
    tertiary: "rgb(230, 186, 215)",
    onTertiary: "rgb(69, 38, 61)",
    tertiaryContainer: "rgb(93, 60, 84)",
    onTertiaryContainer: "rgb(255, 215, 240)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(27, 27, 31)",
    onBackground: "rgb(228, 225, 230)",
    surface: "rgb(27, 27, 31)",
    onSurface: "rgb(228, 225, 230)",
    surfaceVariant: "rgb(70, 70, 79)",
    onSurfaceVariant: "rgb(199, 197, 208)",
    outline: "rgb(144, 144, 154)",
    outlineVariant: "rgb(70, 70, 79)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(228, 225, 230)",
    inverseOnSurface: "rgb(48, 48, 52)",
    inversePrimary: "rgb(71, 85, 182)",
    elevation: {
      level0: "transparent",
      level1: "rgb(35, 35, 42)",
      level2: "rgb(40, 40, 49)",
      level3: "rgb(45, 46, 56)",
      level4: "rgb(46, 47, 58)",
      level5: "rgb(49, 51, 62)",
    },
    surfaceDisabled: "rgba(228, 225, 230, 0.12)",
    onSurfaceDisabled: "rgba(228, 225, 230, 0.38)",
    backdrop: "rgba(47, 48, 56, 0.4)",
  },
};
export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme: ThemeProp =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: { ...theme.dark, ...darkTheme.colors } }
      : { ...MD3LightTheme, colors: { ...theme.light, ...lightTheme.colors } };

  useEffect(() => {
    // Simulate loading state
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <RouteGuard>
              <PaperProvider theme={paperTheme}>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </PaperProvider>
            </RouteGuard>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
