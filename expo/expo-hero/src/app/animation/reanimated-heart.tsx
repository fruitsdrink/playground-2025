import { transform } from "@babel/core";
import { Stack } from "expo-router";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedIcon = Animated.createAnimatedComponent(Heart);
export default function ReanimatedHeart() {
  const [isLiked, setIsLiked] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scale.value,
        [1, 1.5],
        [1, 0.2],
        Extrapolation.CLAMP
      ),
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Stack.Screen options={{ title: "Reanimated Heart" }} />
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <View style={{ flex: 1, overflow: "hidden" }}>
          <Text numberOfLines={1} style={{}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus consequuntur tempore ad, voluptatum id repellendus
            dignissimos, ea voluptatibus reprehenderit saepe expedita ipsum amet
            praesentium quas vel illo nostrum ducimus quisquam?
          </Text>
        </View>
        <Pressable
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          onPress={() => {
            scale.value = withRepeat(
              withSpring(1.5, { duration: 200 }),
              2,
              true,
              () => {
                runOnJS(setIsLiked)(!isLiked);
              }
            );
          }}
        >
          <AnimatedIcon
            size={24}
            fill={isLiked ? "red" : "transparent"}
            strokeWidth={isLiked ? 0 : 1}
            color={"red"}
            style={[animatedStyle]}
          />
        </Pressable>
      </View>
    </View>
  );
}
