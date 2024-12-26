import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ExploreScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "发现"
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <Text>发现页面</Text>
      </View>
    </>
  );
}
