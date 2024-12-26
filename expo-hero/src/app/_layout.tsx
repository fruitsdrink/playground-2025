import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "../../global.css";

// splash screen不能在 expo go 中使用
/*
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true
});
// setTimeout(SplashScreen.hideAsync, 5000);
*/

export default function RootLayout() {
  useFonts({
    "Roboto-Black": require("@assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("@assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("@assets/fonts/Roboto-Regular.ttf")
  });

  return <Stack />;
}
