import { View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import type React from "react";
import { Stack } from "expo-router";
import styled from "styled-components/native";
import { Image } from "expo-image";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { width: ScreenWidth } = Dimensions.get("window");
const BACKGROUND_COLORS = ["#f53f5d", "#f87215", "#14b8a7"];

export default function ReanimatedCarouselScreen() {
  const animatedX = useSharedValue(0);
  const activeIndex = useDerivedValue(() =>
    Math.round(animatedX.value / ScreenWidth)
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    animatedX.value = event.contentOffset.x;
  });

  const activeBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(BACKGROUND_COLORS[activeIndex.value])
    };
  });

  return (
    <>
      <Stack.Screen
        options={{ title: "Reanimated轮播图", headerBackTitle: "返回" }}
      />
      <Container style={[activeBackgroundStyle]}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          style={{
            flex: 1,
            marginBottom: 20
          }}
        >
          {BACKGROUND_COLORS.map((_, index) => (
            <PizzaCarouseItem
              key={`$item-${index.toString()}`}
              index={index}
              animatedX={animatedX}
              activeIndex={activeIndex}
            />
          ))}
        </Animated.ScrollView>
      </Container>
    </>
  );
}

const Container = styled(Animated.View)(() => ({
  flex: 1,
  backgroundColor: "#333"
}));

type PizzaCarouseItemProps = {
  index: number;
  animatedX: SharedValue<number>;
  activeIndex: SharedValue<number>;
};
const PizzaCarouseItem: React.FC<PizzaCarouseItemProps> = ({
  index,
  animatedX,
  activeIndex
}) => {
  const animatedRotationStyle = useAnimatedStyle(() => {
    const degress = interpolate(
      animatedX.value,
      [ScreenWidth * index, ScreenWidth * (index + 1)],
      [0, 360]
    );

    return {
      zIndex: 1,
      transform: [
        {
          rotateZ: `${degress}deg`
        }
      ]
    };
  });

  return (
    <PizzaCarouselWrapper>
      <ImageWrapper>
        <Animated.View style={[animatedRotationStyle]}>
          <StyledImage
            source={require("@assets/images/pizza/pizza01.jpg")}
            contentFit="cover"
          />
        </Animated.View>

        <Rings pageIndex={index} activeIndex={activeIndex} />
      </ImageWrapper>
      <OrderButton index={index} activeIndex={activeIndex} />
    </PizzaCarouselWrapper>
  );
};

const PizzaCarouselWrapper = styled(View)(() => ({
  flex: 1,
  justifyContent: "center",
  width: ScreenWidth
}));

const ImageWrapper = styled(View)(() => ({
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 120
}));

const StyledImage = styled(Image)(() => ({
  width: 190,
  height: 190,
  borderRadius: 95
}));

// 按钮
type OrderButtonProps = {
  index: number;
  activeIndex: SharedValue<number>;
};

const OrderButton: React.FC<OrderButtonProps> = ({ index, activeIndex }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(300, withTiming(activeIndex.value !== index ? 0 : 1)),
      transform: [
        {
          translateY: withDelay(
            300,
            withSpring(activeIndex.value !== index ? 50 : 0)
          )
        }
      ]
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable>
        <BuyButton>
          <View>
            <Text
              style={{
                fontWeight: "600",
                color: "black"
              }}
            >
              Buy
            </Text>
          </View>
        </BuyButton>
      </Pressable>
    </Animated.View>
  );
};

const BuyButton = styled(View)(() => ({
  backgroundColor: "white",
  marginLeft: 75,
  marginRight: 75,
  borderRadius: 50,
  paddingTop: 15,
  paddingBottom: 15,
  alignItems: "center"
}));

// 光晕效果
type RingsProps = {
  pageIndex: number;
  activeIndex: SharedValue<number>;
};
const Rings: React.FC<RingsProps> = ({ pageIndex, activeIndex }) => {
  return (
    <Wrapper>
      {[...Array(3).keys()].map((index) => (
        <RingItem
          index={index}
          key={`ring-item-${index}`}
          pageIndex={pageIndex}
          activeIndex={activeIndex}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled(View)(() => ({
  position: "absolute",
  justifyContent: "center",
  alignItems: "center"
}));

type RingItemProps = {
  index: number;
  pageIndex: number;
  activeIndex: SharedValue<number>;
};

const RingItem: React.FC<RingItemProps> = ({
  index,
  pageIndex,
  activeIndex
}) => {
  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            150 * index,
            withSpring(activeIndex.value === pageIndex ? 1 : 0)
          )
        }
      ]
    };
  });
  return <Ring index={index} style={[animatedScaleStyle]} />;
};

const Ring = styled(Animated.View)<{ index: number }>((props) => ({
  opacity: 0.25 - props.index * 0.1,
  position: "absolute",
  backgroundColor: "white",
  width: 220 + props.index * 60,
  height: 220 + props.index * 60,
  borderRadius: (220 + props.index * 60) / 2
}));
