import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable
} from "react-native";
import type React from "react";
import { Stack } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

type AccordionListItemProps = {
  index: number;
};
const AccordionListItem: React.FC<AccordionListItemProps> = ({ index }) => {
  const { setHeight, animatedHeightStyle, animatedChevronStyle, animatedRef } =
    useAccordion();

  return (
    <View style={styles.accordionListItem}>
      {/* 头部 */}
      <Pressable onPress={() => runOnUI(setHeight)()}>
        <View style={styles.accordionListItemHeader}>
          {/* 标题 */}
          <Text style={{ fontWeight: "bold" }}>Accordion Item #1</Text>
          {/* 箭头 */}
          <Animated.View style={animatedChevronStyle}>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      {/* 内容 */}
      <Animated.View style={[animatedHeightStyle]}>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0
          }}
        >
          <View style={styles.accordionListItemContent} ref={animatedRef}>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              repudiandae consequuntur in voluptatibus error nam quisquam, quo
              ratione dolores aliquam provident ea doloribus fugiat magni,
              perferendis ex debitis soluta perspiciatis?
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const useAccordion = () => {
  const animatedRef = useAnimatedRef<View>();
  const isOpened = useSharedValue(false);
  const height = useSharedValue(0);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value)
    };
  });

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${isOpened.value ? 90 : 0}deg`, { duration: 200 })
        }
      ]
    };
  });

  const setHeight = () => {
    "worklet";

    height.value = !height.value
      ? Number(measure(animatedRef)?.height ?? 0)
      : 0;

    console.log("height: ", height.value);

    isOpened.value = !isOpened.value;
  };

  return {
    animatedRef,
    setHeight,
    animatedHeightStyle,
    animatedChevronStyle
  };
};
export default function AnimatedAccordionScreen() {
  return (
    <>
      <Stack.Screen
        options={{ title: "手风琴列表动画", headerBackTitle: "返回" }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            padding: 16
          }}
          contentContainerStyle={{
            gap: 16
          }}
        >
          {[...Array(10).keys()].map((index) => (
            <AccordionListItem key={index} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accordionListItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    overflow: "hidden"
  },
  accordionListItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  accordionListItemContent: {
    paddingTop: 16
  }
});
