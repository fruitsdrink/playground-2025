import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function Backdrop({
  onPress,
  duration = 500
}: {
  onPress: () => void;
  duration?: number;
}) {
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2 }
      ]}
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(duration)}
    >
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <AnimatedBlurView style={{ flex: 1 }} intensity={100} />
      </Pressable>
    </Animated.View>
  );
}
