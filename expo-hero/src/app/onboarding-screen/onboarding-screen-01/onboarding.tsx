import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";

const slides = [
  {
    id: "1",
    image: require("@assets/images/onboarding-screen/onboarding-screen-01/image01.png"),
    title: "Lorem, ipsum dolor",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  },
  {
    id: "2",
    image: require("@assets/images/onboarding-screen/onboarding-screen-01/image02.png"),
    title: "Lorem, ipsum dolor",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  },
  {
    id: "3",
    image: require("@assets/images/onboarding-screen/onboarding-screen-01/image03.png"),
    title: "Lorem, ipsum dolor",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  }
];

type SlideItem = (typeof slides)[0];

const COLORS = { primary: "#282534", white: "#fff" };
const { width } = Dimensions.get("screen");

export default function OnboardingScreen01() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);

  return (
    <>
      <Stack.Screen
        options={{
          title: "引导屏01",
          headerBackTitle: "返回"
        }}
      />
      <StatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={ref}
          data={slides}
          horizontal
          contentContainerStyle={{
            height: "75%"
          }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <Slide item={item} />;
          }}
          onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const index = Math.floor(offsetX / width);
            setCurrentIndex(index);
          }}
        />
        <Footer
          currentIndex={currentIndex}
          flatRef={ref}
          setCurrentIndex={setCurrentIndex}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center"
  }
});

type SlideProps = {
  item: SlideItem;
};
const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View
      style={{
        alignItems: "center",
        width
      }}
    >
      <Image
        source={item.image}
        style={{
          width,
          height: "75%",
          resizeMode: "contain"
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 20,
          textAlign: "center"
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          color: COLORS.white,
          fontSize: 13,
          marginTop: 10,
          textAlign: "center",
          maxWidth: "70%",
          lineHeight: 23
        }}
      >
        {item.subtitle}
      </Text>
    </View>
  );
};

type FooterProps = {
  currentIndex: number;
  flatRef: React.RefObject<FlatList>;
  setCurrentIndex: (index: number) => void;
};
const Footer: React.FC<FooterProps> = ({
  currentIndex,
  flatRef,
  setCurrentIndex
}) => {
  const router = useRouter();

  const onNextHandler = () => {
    if (currentIndex < slides.length - 1) {
      // flatRef.current?.scrollToIndex({
      //   index: currentIndex + 1,
      //   animated: true
      // });

      const offsetX = (currentIndex + 1) * width;
      flatRef.current?.scrollToOffset({ offset: offsetX, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onSkipHandler = () => {
    const offsetX = (slides.length - 1) * width;
    flatRef.current?.scrollToOffset({ offset: offsetX, animated: true });
    setCurrentIndex(slides.length - 1);
  };

  return (
    <View
      style={{
        height: "25%",
        width,
        justifyContent: "space-between",
        paddingHorizontal: 20
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20
        }}
      >
        {/* 指示器 */}
        {slides.map((_, index) => {
          return (
            <View
              key={index.toString()}
              style={[
                {
                  height: 2.5,
                  width: 10,
                  backgroundColor: "grey",
                  marginHorizontal: 3,
                  borderRadius: 2
                },
                currentIndex === index && {
                  backgroundColor: "white",
                  width: 25
                }
              ]}
            />
          );
        })}
      </View>
      {/* 按钮 */}
      <View style={{ marginBottom: 20 }}>
        {currentIndex === slides.length - 1 && (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={footerStyles.btn}
              onPress={() => {
                router.replace("/onboarding-screen/onboarding-screen-01/home");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold"
                }}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentIndex < slides.length - 1 && (
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={onSkipHandler}
              style={[
                footerStyles.btn,
                {
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: COLORS.white
                }
              ]}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: COLORS.white
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity style={footerStyles.btn} onPress={onNextHandler}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold"
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const footerStyles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center"
  }
});
