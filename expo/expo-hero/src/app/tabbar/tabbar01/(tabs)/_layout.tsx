import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { TabBar } from "@/components/tabbar/tabbar01/TabBar";

export default function Tabbar01TabsLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ title: "首页" }} />
        <Tabs.Screen name="explore" options={{ title: "发现" }} />
        <Tabs.Screen name="profile" options={{ title: "我的" }} />
      </Tabs>
    </>
  );
}
