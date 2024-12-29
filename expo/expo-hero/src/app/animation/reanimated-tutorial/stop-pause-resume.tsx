import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

export default function StopPauseResume() {
  const translateY = useSharedValue(0);
  const paused = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value
        }
      ]
    };
  });

  const toggle = () => {
    "worklet";

    paused.value = !paused.value;
  };

  useEffect(() => {
    const animate = () => {
      "worklet";

      translateY.value = withPause(
        withSequence(
          withTiming(-100, { duration: 1000 }),
          withTiming(100, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        paused
      );
    };

    runOnUI(animate)();
  }, [translateY, paused]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "动画暂停恢复", headerBackTitle: "返回" }}
      />
      <Pressable
        onPress={() => {
          runOnUI(toggle)();
        }}
      >
        <Animated.View style={[styles.circle, animatedStyle]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    backgroundColor: "red",
    width: 100,
    aspectRatio: 1,
    borderRadius: 100
  }
});
