import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function OnboardingScreen01Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏01",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <Stack
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="onboarding"
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="home" />
      </Stack>
    </>
  );
}
