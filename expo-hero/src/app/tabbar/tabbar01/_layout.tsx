import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Tabbar01Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Tabbar动画01",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <Stack>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
