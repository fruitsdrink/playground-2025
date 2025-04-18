import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useLocalMigrations } from "@/hooks/useLocalMigrations";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { success, error } = useLocalMigrations();

  if (!success) {
    console.log(error);
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            title: "Habits",
            headerLargeTitle: true,
            // headerShown: true,
            // headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="habit/[id]"
          options={{
            title: "",
            presentation: "formSheet",
          }}
        />
        <Stack.Screen
          name="icons"
          options={{
            title: "Icon",
            presentation: "formSheet",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
