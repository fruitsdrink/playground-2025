import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "我的",
          headerBackTitle: "返回"
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
        <Text>我的页面</Text>
      </View>
    </>
  );
}
