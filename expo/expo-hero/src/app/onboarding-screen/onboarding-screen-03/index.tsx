import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("window");

const COLORS = {
  black: "#1e1f20",
  white: "#ffffff",
  gray: "#6a6a6a",
  blue: "#0682fe"
};

const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 14,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height
};

const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22
  }
};

const images = {
  image1: require("@assets/images/onboarding-screen/onboarding-screen-03/onboarding-1.png"),
  image2: require("@assets/images/onboarding-screen/onboarding-screen-03/onboarding-2.png"),
  image3: require("@assets/images/onboarding-screen/onboarding-screen-03/onboarding-3.png")
};

const slides = [
  {
    id: "1",
    title: "Let's Travelling",
    desc: "Travel when you feel like it, without waiting for the right time",
    img: images.image1
  },
  {
    id: "2",
    title: "Navigation",
    desc: "Navigate to your destination easily with the app",
    img: images.image2
  },
  {
    id: "3",
    title: "Traveling",
    desc: "Travel when you feel like it, without waiting for the right time",
    img: images.image3
  }
];

const appTheme = { COLORS, SIZES, FONTS };

export default function OnboardingScreen03() {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    const fn = ({ value }: { value: number }) => {
      console.log(value);
      if (Math.floor(value / appTheme.SIZES.width) === slides.length - 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    };
    const id = scrollX.addListener(fn);

    return () => scrollX.removeListener(id);
  }, [scrollX.addListener, scrollX.removeListener]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏03",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <SafeAreaView style={styles.container}>
        <View>
          <Content scrollX={scrollX} completed={completed} />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: appTheme.SIZES.height > 700 ? "30%" : "20%"
          }}
        >
          <Dots scrollX={scrollX} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.COLORS.white
  }
});

type ContentProps = {
  scrollX: Animated.Value;
  completed: boolean;
};
const Content: React.FC<ContentProps> = ({ scrollX, completed }) => {
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      decelerationRate={0}
      scrollEventThrottle={16}
      snapToAlignment={"center"}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { x: scrollX } }
          }
        ],
        {
          useNativeDriver: false // useNativeDriver 为false时，scrollX才能正常工作
        }
      )}
    >
      {slides.map((item, index) => {
        return (
          <View
            key={item.id}
            style={{
              width: appTheme.SIZES.width
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40
              }}
            >
              <Text
                style={[
                  appTheme.FONTS.h1,
                  { color: appTheme.COLORS.gray, textAlign: "center" }
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  appTheme.FONTS.body3,
                  {
                    textAlign: "center",
                    marginTop: appTheme.SIZES.base,
                    color: appTheme.COLORS.gray
                  }
                ]}
              >
                {item.desc}
              </Text>
            </View>
            {/* Button */}
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 150,
                height: 60,
                paddingLeft: 20,
                justifyContent: "center",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: appTheme.COLORS.blue
              }}
            >
              <Text
                style={[appTheme.FONTS.h1, { color: appTheme.COLORS.white }]}
              >
                {completed ? "Let's Go" : "Skip"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

type DotsProps = {
  scrollX: Animated.Value;
};
const Dots: React.FC<DotsProps> = ({ scrollX }) => {
  // 1. 计算每个圆点的位置
  const dotPosition = Animated.divide(scrollX, appTheme.SIZES.width);

  return (
    <View style={dotsStyles.container}>
      {slides.map((item, index) => {
        const opacity = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp"
        });

        const dotSize = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [appTheme.SIZES.base, 17, appTheme.SIZES.base],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={item.id}
            style={[
              dotsStyles.dot,
              {
                width: dotSize,
                height: dotSize,
                opacity
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const dotsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: appTheme.SIZES.padding
  },
  dot: {
    borderRadius: appTheme.SIZES.radius,
    backgroundColor: appTheme.COLORS.blue,
    marginHorizontal: appTheme.SIZES.radius / 2
  }
});
