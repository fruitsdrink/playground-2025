import type React from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { _dotContainer } from "./constants";

type PaginationIndicatorProps = {
  animation: SharedValue<number>;
};
const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({
  animation
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      width: 24 + 24 * animation.value
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#29be56",
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          left: 0,
          top: 0
        },
        stylez
      ]}
    />
  );
};

export default PaginationIndicator;
