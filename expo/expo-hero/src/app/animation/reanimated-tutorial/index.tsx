import { View, Text } from "react-native";
import React from "react";
import { type Href, Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const tutorials = [
  {
    id: "1",
    title: "动画4步",
    url: "/animation/reanimated-tutorial/animated-4-steps" as Href,
    youtube: "https://youtu.be/NRHoyKgb42E?si=M1r1Brzuqd9KAvhz" as Href
  },
  {
    id: "2",
    title: "动画暂停恢复",
    url: "/animation/reanimated-tutorial/stop-pause-resume" as Href,
    youtube: "https://youtu.be/Oh0zo75sUK8?si=C8vC2Yv7f8L9YYz3" as Href
  },
  {
    id: "3",
    title: "动画反应",
    url: "/animation/reanimated-tutorial/animated-reaction" as Href,
    youtube: "https://youtu.be/Wr0mY6S8ssA?si=Epx3EYEXLt3PKoWy" as Href
  },
  {
    id: "4",
    title: "手风琴列表动画",
    url: "/animation/reanimated-tutorial/animated-accordion" as Href,
    youtube: "https://youtu.be/cllr2NksjEE?si=oa4pMhSExLQ8SMD6" as Href
  },
  {
    id: "5",
    title: "堆栈卡片动画",
    url: "/animation/reanimated-tutorial/animated-stack-carousel" as Href,
    youtube: "https://youtu.be/jZFqIvgmBrw?si=cNnqTzrceXiaX6ck" as Href
  },
  {
    id: "6",
    title: "堆栈卡片轮播动画",
    url: "/animation/reanimated-tutorial/animated-stack-carousel2" as Href,
    youtube: "https://youtu.be/tm3ztbm1yog?si=eUoMChZCPOEnYhWd" as Href
  },
  {
    id: "7",
    title: "动画标签",
    url: "/animation/reanimated-tutorial/animated-top-tab" as Href,
    youtube: "https://www.bilibili.com/video/BV1Q5YZesE5M" as Href
  }
];

export default function ReanimatedTutorialHomeScreen() {
  return (
    <View className="justify-center p-4">
      <Stack.Screen options={{ title: "Reanimated 练习" }} />
      <View className="gap-4">
        {tutorials.map((tutorial) => (
          <View
            key={tutorial.id}
            className="flex-row gap-4 items-center p-4 bg-white rounded-md shadow-rn"
          >
            <Link href={tutorial.youtube}>
              <FontAwesome name="youtube-square" size={24} color="black" />
            </Link>
            <Link href={tutorial.url} className="flex-1">
              <Text>{tutorial.title}</Text>
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
