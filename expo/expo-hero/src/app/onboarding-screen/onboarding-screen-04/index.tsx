import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import type React from "react";
import { Stack } from "expo-router";
import Animated, {
  type DerivedValue,
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback } from "react";

const PAGES = [
  {
    id: "1",
    title: "Samurai",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias possimus, veritatis laudantium officia quod nobis quaerat perspiciatis accusamus quos esse ullam fugit ut ab animi dolor quam consectetur. Ea, dolor!",
    img: require("@assets/images/onboarding-screen/onboarding-screen-04/01.png")
  },
  {
    id: "2",
    title: "Reject",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil eligendi? Alias magni mollitia maxime impedit quos amet inventore facere sequi nisi possimus sit, vel ea quasi consectetur velit? Aut!",
    img: require("@assets/images/onboarding-screen/onboarding-screen-04/02.png")
  },
  {
    id: "3",
    title: "Great Wave",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In numquam dicta molestiae doloribus. Ipsam aperiam, dolorem rerum molestias nemo, reiciendis quis vero sequi exercitationem consequatur, modi magnam. Porro, eum accusamus?",
    img: require("@assets/images/onboarding-screen/onboarding-screen-04/03.png")
  }
];

type PageItem = (typeof PAGES)[0];
const BACKGROUND_COLOR = "#f1f1f1";

export default function OnboardScreen4() {
  const translateX = useSharedValue(0);

  const onScrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    }
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value < PAGES.length - 1) {
      scrollRef?.current?.scrollTo({ x: (activeIndex.value + 1) * PAGE_WIDTH });
    }
  }, [activeIndex.value, scrollRef]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={onScrollHandle}
        >
          {PAGES.map((item, index) => {
            return (
              <Page
                key={item.id}
                page={item}
                index={index}
                translateX={translateX}
              />
            );
          })}
        </Animated.ScrollView>
        <View style={styles.footer}>
          <View style={[styles.fillCenter, { flexDirection: "row" }]}>
            {PAGES.map((_, index) => {
              return (
                <Dot
                  key={index.toString()}
                  index={index}
                  activeDotIndex={activeIndex}
                />
              );
            })}
          </View>
          <View style={styles.fillCenter}>
            <Text style={styles.text}>View Board</Text>
          </View>
          <View style={styles.fillCenter}>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              onPress={onIconPress}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: "row"
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500"
  }
});

// ==== Page ====
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");
const CIRCLE_WIDTH = PAGE_WIDTH * 0.7;

type PageProps = {
  page: PageItem;
  index: number;
  translateX: Animated.SharedValue<number>;
};
const Page: React.FC<PageProps> = ({ page, index, translateX }) => {
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }]
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [
        {
          rotateZ: `${progress * Math.PI}rad`
        }
      ]
    };
  });

  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.circleContainer}>
        <Animated.View style={[pageStyles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.img}
          style={[pageStyles.image, rImageStyle]}
          resizeMode="contain"
        />
      </View>
      <Text style={pageStyles.title}>{page.title}</Text>
      <Text style={pageStyles.desc}>{page.desc}</Text>
    </View>
  );
};

const pageStyles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute"
  },
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: CIRCLE_WIDTH / 2,
    backgroundColor: "white"
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15
  },
  desc: {
    textAlign: "center",
    fontSize: 14,
    color: "gray"
  }
});

// ==== dot ====
type DotProps = {
  index: number;
  activeDotIndex: DerivedValue<number>;
};
const Dot: React.FC<DotProps> = ({ activeDotIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        index === activeDotIndex.value ? "black" : "white",
        {
          duration: 150
        }
      )
    };
  });
  return <Animated.View style={[dotStyles.dot, rDotStyle]} />;
};

const dotStyles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5
  }
});
