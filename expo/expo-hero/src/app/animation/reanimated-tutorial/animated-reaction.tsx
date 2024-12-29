import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function StopPauseResume() {
  const opacity = useSharedValue(1);
  const toggle = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  const jsFun = (value: number) => {
    console.log("press, current value: ", value);
  };

  const fadeIn = () => {
    "worklet";

    opacity.value = withTiming(1, { duration: 500 });
  };

  const fadeOut = () => {
    "worklet";
    opacity.value = withTiming(0, { duration: 500 });
  };

  const onPress = () => {
    "worklet";

    toggle.value = toggle.value === 1 ? 0 : 1;
  };

  useAnimatedReaction(
    () => {
      return toggle.value;
    },
    (currentValue, prevValue) => {
      if (currentValue) {
        fadeIn();
      } else {
        fadeOut();
      }

      runOnJS(jsFun)(currentValue);
    }
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "动画反应", headerBackTitle: "返回" }} />
      <Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 8
        }}
        onPress={() => {
          runOnUI(onPress)();
        }}
      >
        <Animated.View style={[styles.circle, animatedStyle]} />
        <Text>点击切换透明度</Text>
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
