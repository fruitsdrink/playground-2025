import { type PressableProps, Pressable } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import type React from "react";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { _buttonHeight, _layoutTransition, _spacing } from "./constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Button: React.FC<AnimatedProps<PressableProps>> = ({
  children,
  style,
  className,
  ...rest
}) => {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2
        },
        style
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};
