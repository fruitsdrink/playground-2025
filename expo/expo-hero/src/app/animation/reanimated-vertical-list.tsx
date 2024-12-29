import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { fakerZH_CN as faker, he } from "@faker-js/faker";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const _spacing = 8;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacing * 2;

faker.seed(12);
const mockData = [...Array(20).keys()].map(() => {
  return {
    key: faker.string.uuid(),
    title: faker.music.artist(),
    image: faker.image.urlLoremFlickr({
      width: 300,
      height: 300 * 1.4,
      category: "nature"
    }),
    bg: faker.internet.color(),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    author: {
      name: faker.person.fullName(),
      avatar: faker.image.avatarGitHub()
    }
  };
});

type Item = (typeof mockData)[0];

export default function ReanimatedVerticalList() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "竖向列表动画",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          backgroundColor: "#111",
          justifyContent: "center"
        }}
      >
        <VerticalList data={mockData} />
      </View>
    </>
  );
}

type AnimatedCardProps = {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
};
function AnimatedCard({ item, index, scrollY }: AnimatedCardProps) {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.7, 1, 0.7],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92],
            Extrapolation.CLAMP
          )
        }
      ]
    };
  });
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: "#fff",
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing
        },
        rStyle
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: 8
          }
        ]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          height: _itemSize * 0.4
        }}
      />
      <View
        style={{
          gap: _spacing
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#fff"
          }}
        >
          {item.title}
        </Text>
        <Text style={{ color: "#ddd" }} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: _spacing
        }}
      >
        <Image
          source={{ uri: item.author.avatar }}
          style={{
            width: 24,
            aspectRatio: 1,
            borderRadius: 12
          }}
        />
        <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
}

type VerticalListProps = {
  data: Item[];
};
function VerticalList({ data }: VerticalListProps) {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y / _itemFullSize;
    }
  });
  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2
      }}
      snapToInterval={_itemFullSize}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        return <AnimatedCard item={item} index={index} scrollY={scrollY} />;
      }}
      onScroll={onScroll}
    />
  );
}
