import { isFabOpen$ } from "@/state/misc";
import { observer } from "@legendapp/state/react";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Backdrop = observer(
  ({ onPress, duration = 500 }: { onPress: () => void; duration?: number }) => {
    if (!isFabOpen$.get()) {
      return null;
    }

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "rgba(255,255,255,0.5)", zIndex: 2 },
        ]}
        entering={FadeIn.duration(duration)}
        exiting={FadeOut.duration(duration)}
      >
        <Pressable
          onPress={() => {
            onPress();
            isFabOpen$.set(false);
          }}
          style={{ flex: 1 }}
        >
          <AnimatedBlurView style={{ flex: 1 }} intensity={30} />
        </Pressable>
      </Animated.View>
    );
  }
);
