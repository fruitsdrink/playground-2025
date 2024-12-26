import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { TabBar } from "@/components/tabbar/tabbar02/TabBar";

export default function Tabbar02Layout() {
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
        <Tabs.Screen name="create" options={{ title: "创作" }} />
        <Tabs.Screen name="profile" options={{ title: "我的" }} />
      </Tabs>
    </>
  );
}
