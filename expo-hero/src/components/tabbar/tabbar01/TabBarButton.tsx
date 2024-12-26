import { Text, StyleSheet } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import React, { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import type { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

type IconProps = {
  color: string;
};
const icons = {
  index: (props: IconProps) => <Feather name="home" size={24} {...props} />,
  explore: (props: IconProps) => (
    <Feather name="compass" size={24} {...props} />
  ),
  profile: (props: IconProps) => <Feather name="user" size={24} {...props} />
};

type TabBarButtonProps = {
  key: string;
  href: string | undefined;
  isFocused: boolean;
  accessibilityLabel: string | undefined;
  testID: string | undefined;
  icon: "index" | "explore" | "profile";
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
      }) => React.ReactNode);
  onPress: () => void;
  onLongPress: () => void;
};
export default function TabBarButton({
  key,
  href,
  isFocused,
  accessibilityLabel,
  testID,
  icon,
  label,
  onPress,
  onLongPress
}: TabBarButtonProps) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [1, 1.2])
        }
      ],
      top: interpolate(scale.value, [0, 1], [0, 9])
    };
  });

  return (
    <PlatformPressable
      key={key}
      href={href}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={[rIconStyle]}>
        {icons[icon as keyof typeof icons]({
          color: isFocused ? "#fff" : "#222"
        })}
      </Animated.View>
      <Animated.Text
        style={[{ color: isFocused ? "#673ab7" : "#222" }, rTextStyle]}
      >
        {typeof label === "string" ? label : React.createElement(label)}
      </Animated.Text>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  }
});
