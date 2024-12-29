import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewToken
} from "react-native";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#FF5678",

  black: "#171717",
  white: "#FFFFFF",
  background: "#FFFFFF"
};

export const SIZES = {
  base: 10,
  width,
  height
};

const theme = { COLORS, SIZES };

const data = [
  {
    _id: "1",
    title: "Play The Beat",
    description: "Most beginner producers learn make creating by simple beats.",
    img: require("@assets/images/onboarding-screen/onboarding-screen-06/01.png")
  },
  {
    _id: "2",
    title: "Live The Life",
    description:
      "In our daily lives, we often rush tasks trying to get them finish.",
    img: require("@assets/images/onboarding-screen/onboarding-screen-06/02.png")
  },
  {
    _id: "3",
    title: "Capture The Moment",
    description:
      "You are not alone. You have unique ability to go to another world.",
    img: require("@assets/images/onboarding-screen/onboarding-screen-06/03.png")
  }
];

type DataItem = (typeof data)[0];

const OnboardingScreen06 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewableItems, setViewableItems] = useState<ViewToken<DataItem>[]>([]);

  const flatListRef = useRef<FlatList>(null);
  const handleViewableItemsChanged = useCallback(
    ({
      viewableItems
    }: {
      viewableItems: Array<ViewToken<DataItem>>;
      changed: Array<ViewToken<DataItem>>;
    }) => {
      setViewableItems(viewableItems);
    },
    []
  );

  useEffect(() => {
    if (!viewableItems[0] || currentIndex === viewableItems[0].index) return;

    setCurrentIndex(viewableItems[0].index ?? 0);
  }, [currentIndex, viewableItems]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏06",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.COLORS.background}
      />
      <View style={styles.container}>
        {/* Top section - back & skip button */}
        <TopSection currentIndex={currentIndex} flatListRef={flatListRef} />

        {/* FlatList with pages */}
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          pagingEnabled
          renderItem={({ item }) => <FlatListItem item={item} />}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100
          }}
          initialNumToRender={1}
          extraData={theme.SIZES.width}
        />

        {/* Bottom section - pagination & next or getStarted button */}
        <BottomSection currentIndex={currentIndex} flatListRef={flatListRef} />
      </View>
    </>
  );
};

export default OnboardingScreen06;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.COLORS.background
  }
});

const TopSection = ({
  currentIndex,
  flatListRef
}: {
  currentIndex: number;
  flatListRef: React.RefObject<FlatList>;
}) => {
  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex - 1
      });
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: data.length - 1
    });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: theme.SIZES.base * 2
        }}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={handleBack}
          style={{
            padding: theme.SIZES.base
          }}
        >
          <AntDesign
            name="left"
            style={{
              fontSize: 25,
              color: theme.COLORS.black,
              opacity: currentIndex === 0 ? 0 : 1
            }}
          />
        </TouchableOpacity>

        {/* Skip button */}
        <TouchableOpacity onPress={handleSkip}>
          <Text
            style={{
              fontSize: 18,
              color: theme.COLORS.black,
              opacity: currentIndex === data.length - 1 ? 0 : 1
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const BottomSection = ({
  currentIndex,
  flatListRef
}: {
  currentIndex: number;
  flatListRef: React.RefObject<FlatList>;
}) => {
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1
      });
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.SIZES.base * 2
        }}
      >
        {/* Pagination */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {[...Array(data.length)].map((_, index) => {
            return (
              <View
                key={`dot-${index.toString()}`}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    currentIndex === index
                      ? theme.COLORS.primary
                      : theme.COLORS.primary + 20,
                  marginRight: 8
                }}
              />
            );
          })}
        </View>
        {/* Next or GetStarted button */}
        {currentIndex !== data.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.COLORS.primary
            }}
            activeOpacity={0.8}
          >
            <AntDesign
              name="right"
              style={{
                fontSize: 18,
                color: theme.COLORS.white,
                opacity: 0.3
              }}
            />
            <AntDesign
              name="right"
              style={{
                fontSize: 25,
                color: theme.COLORS.white,
                marginLeft: -15
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              paddingHorizontal: theme.SIZES.base * 2,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.COLORS.primary,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: theme.COLORS.white,
                fontSize: 18,
                marginLeft: theme.SIZES.base
              }}
            >
              Get Started
            </Text>
            <AntDesign
              name="right"
              style={{
                fontSize: 18,
                color: theme.COLORS.white,
                opacity: 0.3,
                marginLeft: theme.SIZES.base
              }}
            />
            <AntDesign
              name="right"
              style={{
                fontSize: 25,
                color: theme.COLORS.white,
                marginLeft: -15
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const FlatListItem = ({ item }: { item: DataItem }) => {
  return (
    <View
      style={{
        width: theme.SIZES.width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: theme.SIZES.base * 2
        }}
      >
        <ImageBackground
          source={item.img}
          style={{
            width: 335,
            height: 335
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          padding: theme.SIZES.base * 4
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            opacity: 0.8,
            textAlign: "center",
            marginTop: 15,
            lineHeight: 28
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};
