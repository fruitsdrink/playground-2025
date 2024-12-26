import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  type ViewToken
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  type SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { Stack } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const images = [
  require("@assets/images/pexels/image01.jpg"),
  require("@assets/images/pexels/image02.jpg"),
  require("@assets/images/pexels/image03.jpg"),
  require("@assets/images/pexels/image04.jpg"),
  require("@assets/images/pexels/image05.jpg")
];

const mockList = [...Array(5).keys()].map((index) => ({
  id: index,
  title: faker.book.title(),
  image: images[index],
  desc: faker.lorem.paragraph()
}));

export default function ReanimatedSlider() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "循环轮播图", headerBackTitle: "返回" }}
      />
      <Slider itemList={mockList} />
    </View>
  );
}

// 轮播图
type SliderProps = {
  itemList: typeof mockList;
};
const Slider: React.FC<SliderProps> = ({ itemList }) => {
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [data, setData] = useState(itemList);
  const ref = useAnimatedRef<Animated.FlatList<View>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + screenWidth;
      }, 2000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      // 解决手动滑动后，自动播放的位置不对的问题
      offset.value = e.contentOffset.x;
    }
  });

  const onViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setCurrentIndex(viewableItems[0].index % itemList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ]);

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={data}
        keyExtractor={(item) => item.id.toString()}
        onScroll={scrollHandler}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() =>
          setData([
            ...data,
            ...itemList.map((it) => {
              return {
                ...it,
                id: it.id + (new Date().getTime() + Math.random())
              };
            })
          ])
        }
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}
      />
      <Pagination
        items={mockList}
        scrollX={scrollX}
        currentIndex={currentIndex}
      />
    </View>
  );
};

// 分页组件
type PaginationProps = {
  items: typeof mockList;
  scrollX: SharedValue<number>;
  currentIndex: number;
};
const Pagination: React.FC<PaginationProps> = ({
  items,
  scrollX,
  currentIndex
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {items.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth
            ],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth
          };
        });
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                height: 8,
                width: 8,
                marginHorizontal: 2,
                borderRadius: 8
              },
              {
                backgroundColor: currentIndex === index ? "#222" : "#aaa"
              }
              // animatedStyle // 循环模式下，此动画样式无效
            ]}
          />
        );
      })}
    </View>
  );
};

// 轮播项目
type SliderItemProps = {
  item: (typeof mockList)[0];
  index: number;
  scrollX: SharedValue<number>;
};
const SliderItem: React.FC<SliderItemProps> = ({ item, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth
            ],
            [-screenWidth * 0.22, 0, screenWidth * 0.22],
            Extrapolation.CLAMP
          )
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth
            ],
            [0.9, 1, 0.9],
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
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          width: screenWidth
        },
        animatedStyle
      ]}
    >
      <Image
        source={item.image}
        style={{
          width: 300,
          height: 500,
          borderRadius: 20
        }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          position: "absolute",
          width: 300,
          height: 500,
          padding: 20,
          borderRadius: 20,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            alignItems: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: 5,
              borderRadius: 50
            }}
          >
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            gap: 10
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 1.5
            }}
          >
            {item.title} {index + 1}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              letterSpacing: 1.2
            }}
          >
            {item.desc}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
