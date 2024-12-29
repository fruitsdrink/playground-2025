import { View, StyleSheet, type LayoutChangeEvent } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import TabBarButton from "./TabBarButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const [dimensions, setDimensions] = React.useState({
    height: 20,
    width: 100
  });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  };

  const tabPositionX = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value
        }
      ]
    };
  });

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: "#723fe8",
            borderRadius: buttonWidth,
            marginHorizontal: 12,
            height: buttonWidth - 24,
            width: buttonWidth - 24
          },
          rStyle
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <TabBarButton
            key={`button-${route.key ?? "0"}`}
            href={buildHref(route.name, route.params)}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            isFocused={isFocused}
            label={label}
            icon={route.name as "index" | "explore" | "profile"}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 40,
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)"
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 5
  }
});
