import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Tabbar01Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "首页",
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
        <Text>首页页面</Text>
      </View>
    </>
  );
}
