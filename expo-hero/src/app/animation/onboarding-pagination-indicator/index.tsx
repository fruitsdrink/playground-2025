import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Onboarding } from "@/components/amimation/onboarding-pagination-indicator/Onboarding";

export default function AnimationOnboardingPaginationIndicatorScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <Stack.Screen options={{ title: "分页指示器引导页" }} />
      <View className="flex-1 justify-center bg-white">
        <Onboarding
          total={4}
          selectedIndex={selectedIndex}
          onIndexChange={setSelectedIndex}
        />
      </View>
    </>
  );
}
