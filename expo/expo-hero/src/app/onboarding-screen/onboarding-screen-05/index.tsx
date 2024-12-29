import {
  View,
  Text,
  Dimensions,
  StatusBar,
  Animated,
  Image,
  StyleSheet
} from "react-native";
import React from "react";
import { Stack } from "expo-router";

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require("@assets/images/onboarding-screen/onboarding-screen-05/01.png")
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: require("@assets/images/onboarding-screen/onboarding-screen-05/02.png")
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: require("@assets/images/onboarding-screen/onboarding-screen-05/03.png")
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: require("@assets/images/onboarding-screen/onboarding-screen-05/04.png")
  }
];

const { width, height } = Dimensions.get("screen");

export default function OnboardingScreen05() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏05",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <StatusBar hidden />

      <View style={styles.container}>
        <Backdrop scrollX={scrollX} />
        <Square scrollX={scrollX} />
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          pagingEnabled
          contentContainerStyle={{
            paddingBottom: 100
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX
                  }
                }
              }
            ],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width,
                  alignItems: "center",
                  padding: 20
                }}
              >
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "center"
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: width / 2,
                      height: width / 2,
                      resizeMode: "contain"
                    }}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "800",
                      marginBottom: 10,
                      color: "#fff"
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ fontWeight: "300", color: "#fff" }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

// Indicator

type IndicatorProps = {
  scrollX: Animated.Value;
};
const Indicator: React.FC<IndicatorProps> = ({ scrollX }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 100
      }}
    >
      {DATA.map((_, index) => {
        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp"
        });
        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={`indicator-${index.toString()}`}
            style={[
              {
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginHorizontal: 10,
                opacity,
                transform: [
                  {
                    scale
                  }
                ]
              }
            ]}
          />
        );
      })}
    </View>
  );
};

// Backdrop
const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, index) => index * width),
    outputRange: bgs.map((bg) => bg)
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor
        }
      ]}
    >
      <Text>Backdrop</Text>
    </Animated.View>
  );
};

// Square

const Square = ({ scrollX }: { scrollX: Animated.Value }) => {
  const YOLO = Animated.modulo(
    // divide 的作用是将 scrollX 的值除以 width，得到一个小数，用于计算旋转角度
    // modulo 的作用是将 scrollX 的值限制在 0 ~ width 之间
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"]
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate
          },
          {
            translateX
          }
        ]
      }}
    />
  );
};
