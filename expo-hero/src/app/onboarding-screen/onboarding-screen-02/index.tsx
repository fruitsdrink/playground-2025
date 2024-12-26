import {
  View,
  Text,
  type ImageSourcePropType,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Pressable
} from "react-native";
import React, { useRef } from "react";
import { Stack } from "expo-router";

const { width, height } = Dimensions.get("screen");

const COLORS = {
  primary: "#f52d56",
  title: "#072f4a"
};

const SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,

  width,
  height
};

const slides: SlideItem[] = [
  {
    id: "1",
    title: "Discover Best Places",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: require("@assets/images/onboarding-screen/onboarding-screen-02/image1.png")
  },
  {
    id: "2",
    title: "Choose A Tasty Dish",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia a eveniet necessitatibus quas odio cupiditate. Praesentium optio cum facere modi non, quos debitis nam sint eius, quas officia error reiciendis?",
    image: require("@assets/images/onboarding-screen/onboarding-screen-02/image2.png")
  },
  {
    id: "3",
    title: "Pick Up The Delivery",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quidem officia iure et pariatur. Iusto deserunt quos earum mollitia aperiam, consectetur velit dolor, doloribus a voluptas magnam! Neque, aut nisi.",
    image: require("@assets/images/onboarding-screen/onboarding-screen-02/image3.png")
  }
];

type SlideItem = {
  id: string;
  title: string;
  desc: string;
  image: ImageSourcePropType;
};

export default function OnBoarding02Screen() {
  const [showHomePage, setShowHomePage] = React.useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏2",
          headerBackTitle: "返回",
          headerShown: showHomePage
        }}
      />
      {showHomePage ? (
        <HomePage />
      ) : (
        <OnboardingScreen
          onDone={() => {
            setShowHomePage(true);
          }}
        />
      )}
    </>
  );
}

const HomePage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Home</Text>
    </View>
  );
};

type OnboardingScreenProps = {
  onDone: () => void;
};
const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onDone }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = useRef<FlatList>(null);

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <FlatList
          ref={ref}
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={(e) => {
            setCurrentIndex(
              Math.floor(e.nativeEvent.contentOffset.x / SIZES.width)
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width,
                  flex: 1,
                  alignItems: "center",
                  padding: 15,
                  paddingTop: 100
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: width - 80,
                    height: 400
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.title,
                    fontSize: SIZES.h1
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    paddingTop: 5,
                    color: COLORS.title
                  }}
                >
                  {item.desc}
                </Text>
              </View>
            );
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Pressable
            style={{
              padding: 12
            }}
            onPress={() => {
              ref.current?.scrollToIndex({
                index: slides.length - 1
              });
            }}
          >
            <Text
              style={[
                {
                  fontWeight: "600",
                  fontSize: SIZES.h4
                },
                {
                  opacity: currentIndex < slides.length - 1 ? 1 : 0
                }
              ]}
            >
              Skip
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              flex: 1
            }}
          >
            {slides.map((_, index) => {
              return (
                <View
                  key={`dot-${index.toString()}`}
                  style={{
                    width: currentIndex === index ? 30 : 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor:
                      currentIndex === index ? COLORS.primary : "gray"
                  }}
                />
              );
            })}
          </View>

          {currentIndex < slides.length - 1 && (
            <Pressable
              style={{
                padding: 12
              }}
              onPress={() => {
                ref.current?.scrollToIndex({
                  index: currentIndex + 1
                });
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: SIZES.h4
                }}
              >
                Next
              </Text>
            </Pressable>
          )}

          {currentIndex === slides.length - 1 && (
            <Pressable
              style={{
                padding: 12
              }}
              onPress={() => {
                onDone();
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: SIZES.h4
                }}
              >
                Done
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
