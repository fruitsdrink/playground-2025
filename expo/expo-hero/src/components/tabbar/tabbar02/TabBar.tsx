import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = BottomTabBarProps;
type IconProps = {
  color: string;
};

export const TabBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  const icons = {
    index: (props: IconProps) => <AntDesign name="home" size={24} {...props} />,
    explore: (props: IconProps) => (
      <AntDesign name="earth" size={24} {...props} />
    ),
    create: (props: IconProps) => (
      <AntDesign name="pluscircle" size={24} {...props} />
    ),
    profile: (props: IconProps) => (
      <AntDesign name="user" size={24} {...props} />
    )
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",
        boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)"
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 10
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 10
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
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
          <TouchableOpacity
            key={route.key}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4
            }}
          >
            {icons[route.name as keyof typeof icons]({
              color: isFocused ? colors.primary : colors.text
            })}
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {typeof label === "string" ? label : React.createElement(label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
