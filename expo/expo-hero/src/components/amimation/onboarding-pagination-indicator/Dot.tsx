import { View } from "react-native";
import type React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue
} from "react-native-reanimated";
import { _dotContainer, _dotSize } from "./constants";

type DotProps = {
  index: number;
  animation: SharedValue<number>;
};
export const Dot: React.FC<DotProps> = ({ index, animation }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        ["#aaa", "#fff", "#fff"]
      )
    };
  });
  return (
    <View
      style={{
        width: _dotContainer,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize
          }
        ]}
      />
    </View>
  );
};
