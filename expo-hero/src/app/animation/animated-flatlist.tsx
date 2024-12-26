import {
  View,
  Text,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
  Animated
} from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("screen");

const BG_IMG =
  "https://images.pexels.com/photos/27957831/pexels-photo-27957831/free-photo-of-two-motorcyclists-ride-down-a-wet-road-in-the-rain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men"
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email()
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function AnimatedFlatListScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen
        options={{
          title: "FlatList动画",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <Image
          source={{ uri: BG_IMG }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={10}
        />
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2) // 这句代码是关键，它决定了每个item的动画效果
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 0.5) // 这句代码是关键，它决定了每个item的动画效果
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
              // extrapolate: "clamp"
            });

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0]
            });

            return (
              <Animated.View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderRadius: 12,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  opacity,
                  transform: [
                    {
                      scale
                    }
                  ]
                  // shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 10
                  // },
                  // shadowOpacity: 1,
                  // shadowRadius: 20
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    overflow: "hidden"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700"
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      opacity: 0.7
                    }}
                  >
                    {item.jobTitle}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      opacity: 0.8,
                      color: "#0099cc"
                    }}
                  >
                    {item.email}
                  </Text>
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
    </>
  );
}
