import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function OnboardingScreen01Home() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Home</Text>
      </View>
    </>
  );
}
