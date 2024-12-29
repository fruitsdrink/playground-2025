import { Stack } from "expo-router";
import type React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function AnimatedStackCarousel() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "堆栈动画",
          headerBackTitle: "返回"
        }}
      />
      <View style={styles.container}>
        <GestureHandlerRootView>
          <Carousel />
        </GestureHandlerRootView>
      </View>
    </>
  );
}

const colors = [
  "#59b4c3",
  "#40a2e3",
  "#fdbf60",
  "#eff396",
  "#9f70fd",
  "#74e291"
];

const Carousel = () => {
  const [data, setData] = useState([...colors]);

  const performSwipe = () => {
    setData((oldData) => {
      const lastElement = oldData.pop(); // pop 方法用于删除并返回数组的最后一个元素。
      if (lastElement) {
        oldData.unshift(lastElement); // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
        return [...oldData];
      }
      return oldData;
    });
  };

  return (
    <View
      style={{
        height: "100%"
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          top: "60%"
        }}
      >
        {data.map((item, index) => (
          <Card
            key={index.toString()}
            index={index}
            color={item}
            length={data.length}
            performSwipe={performSwipe}
          />
        ))}
      </View>
    </View>
  );
};

type CardProps = {
  index: number;
  color: string;
  length: number;
  performSwipe: () => void;
};
const Card: React.FC<CardProps> = ({ index, color, length, performSwipe }) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize((event) => {
      if (
        Math.abs(event.translationX) > 120 ||
        Math.abs(event.translationY) > 120
      ) {
        // perform swipe
        runOnJS(performSwipe)();
      }

      offsetX.value = withTiming(0);
      offsetY.value = withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value
        },
        {
          translateY: offsetY.value
        },
        {
          scaleX: withTiming(
            Math.max(
              1 - (length - index - 1) / 10 + 0.05 * (length - index - 1),
              0.8
            )
          )
        },
        {
          translateY: withTiming(Math.min((length - index - 1) * 5, 10))
        }
      ],
      zIndex: index,
      backgroundColor: color
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  box: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  }
});
