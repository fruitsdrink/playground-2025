import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome5 name="home" size={24} color={color} />
            ) : (
              <AntDesign name="home" size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen name="login" options={{ title: "登录" }} />
    </Tabs>
  );
}
