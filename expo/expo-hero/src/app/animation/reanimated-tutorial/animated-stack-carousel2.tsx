import { View, Text, StyleSheet, ImageBackground } from "react-native";
import type React from "react";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";

const data = [
  {
    title: "Item 1",
    poster: require("@assets/images/pexels/image01.jpg")
  },
  {
    title: "Item 2",
    poster: require("@assets/images/pexels/image02.jpg")
  },
  {
    title: "Item 3",
    poster: require("@assets/images/pexels/image03.jpg")
  },
  {
    title: "Item 4",
    poster: require("@assets/images/pexels/image04.jpg")
  },
  {
    title: "Item 5",
    poster: require("@assets/images/pexels/image05.jpg")
  },
  {
    title: "Item 6",
    poster: require("@assets/images/pexels/image06.jpg")
  }
];

type CardItem = (typeof data)[0];

export default function AnimatedStackCarousel2() {
  const [actualIndex, setActualIndex] = useState(data.length - 1);

  return (
    <>
      <Stack.Screen
        options={{
          title: "堆栈动画",
          headerBackTitle: "返回"
        }}
      />
      <GestureHandlerRootView style={styles.gestureHandlerView}>
        <View style={styles.container}>
          {data.map((item, index) => {
            return (
              <StackCardItem
                key={index.toString()}
                index={index}
                actualIndex={actualIndex}
                setActualIndex={setActualIndex}
                item={item}
              />
            );
          })}
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  gestureHandlerView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

type StackCardItemProps = {
  index: number;
  actualIndex: number;
  setActualIndex: (index: number) => void;
  item: CardItem;
};
const StackCardItem: React.FC<StackCardItemProps> = ({
  index,
  actualIndex,
  setActualIndex,
  item
}) => {
  const position = useSharedValue({ x: 0, y: 0 });
  const lastOffset = useSharedValue({ x: 0, y: 0 });
  const value = useSharedValue(0);

  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolation.CLAMP
    );
  });
  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolation.CLAMP
    );
  });
  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolation.CLAMP
    );
  });

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotate.value}deg`
        },
        {
          translateX: position.value.x + additionalTranslate.value
        },
        {
          translateY: position.value.y
        },
        {
          scale: scale.value
        }
      ]
    };
  });

  useEffect(() => {
    value.value = withSpring(actualIndex, {
      damping: 10,
      stiffness: 100
    });
  }, [actualIndex, value]);

  const panGestureHandle = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({ translationX, translationY }) => {
      position.value = {
        x: translationX + lastOffset.value.x,
        y: translationY + lastOffset.value.y
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) < 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withSpring({ x: 0, y: 0 });
      } else {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10
        });
        setActualIndex(actualIndex - 1);
        data.pop();
      }
    });

  return (
    <GestureDetector gesture={panGestureHandle}>
      <Animated.View
        style={[
          { zIndex: actualIndex + 1 },
          stackCardItemStyle.animatedView,
          rnStyle
        ]}
      >
        <ImageBackground
          source={item.poster}
          style={stackCardItemStyle.imageStyle}
        >
          <View style={stackCardItemStyle.imageView}>
            <View style={stackCardItemStyle.imageTextView}>
              <Text style={stackCardItemStyle.imageText}>{item.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

const stackCardItemStyle = StyleSheet.create({
  animatedView: {
    position: "absolute",
    width: 250,
    height: 350
  },
  imageView: {
    flex: 1,
    justifyContent: "flex-end"
  },
  imageTextView: {
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  imageText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700"
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 12,
    objectFit: "contain"
  }
});
