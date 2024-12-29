import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import type React from "react";
import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const _slideWidth = width * 0.7;
const _slideHeight = _slideWidth * 1.76;
const _spacing = 18;
const _topSpacing = height - _slideHeight;

const queryClient = new QueryClient();
const uri =
  "https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait";

type SearchPayload = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
};
type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export default function ReanimatedWallpaperCarousel2() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Screen
        options={{
          title: "视差轮播图2",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <Wallpaper />
      </View>
    </QueryClientProvider>
  );
}

const Wallpaper = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / (_slideWidth + _spacing);
    }
  });

  const { data, isFetching } = useQuery<Photo[]>({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY
        }
      }).then((res) => res.json());
      // console.log(res);
      return res.photos;
    }
  });

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000"
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {data?.map((item, index) => (
          <BackdropImage
            key={item.id.toString()}
            item={item}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </View>

      <View
        style={{
          height: _topSpacing,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {data?.map((item, index) => {
          return (
            <AuthorDetails
              key={item.id}
              index={index}
              scrollX={scrollX}
              item={item}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _slideWidth) / 2, // 图片居中
          alignItems: "center",
          paddingTop: _topSpacing
        }}
        style={{
          // flexGrow: 0,
          marginTop: -_topSpacing
        }}
        snapToInterval={_slideWidth + _spacing} // 分页效果
        decelerationRate={"fast"} // 快速滑动效果
        renderItem={({ item, index }) => {
          return <Slide item={item} index={index} scrollX={scrollX} />;
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
};

type SlideProps = {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
};
const Slide: React.FC<SlideProps> = ({ item, index, scrollX }) => {
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [40, 0, 40],
            Extrapolation.CLAMP
          )
        }
      ]
    };
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15],
            Extrapolation.CLAMP
          )}deg`
        },
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6],
            Extrapolation.CLAMP
          )
        }
      ]
    };
  });

  return (
    <Animated.View
      style={[
        {
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 7,
          padding: 2,
          backgroundColor: "rgba(0,0,0,0.1)"
          // boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        },
        rContainerStyle
      ]}
    >
      <View
        style={[
          {
            width: _slideWidth,
            height: _slideHeight,
            borderRadius: 12,
            overflow: "hidden"
            // borderWidth: 1,
            // borderColor: "rgba(0,0,0,0.1)"
          }
        ]}
      >
        <Animated.Image
          source={{ uri: item.src.large }}
          style={[{ flex: 1 }, rStyle]}
        />
      </View>
    </Animated.View>
  );
};

const BackdropImage = ({
  scrollX,
  index,
  item
}: {
  scrollX: SharedValue<number>;
  index: number;
  item: Photo;
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 0.7, 0],
        Extrapolation.CLAMP
      )
    };
  });
  return (
    <Animated.Image
      key={item.id.toString()}
      source={{
        uri: item.src.large
      }}
      style={[StyleSheet.absoluteFillObject, rStyle]}
      blurRadius={50}
    />
  );
};

type AuthorDetailsProps = {
  index: number;
  scrollX: SharedValue<number>;
  item: Photo;
};
const AuthorDetails: React.FC<AuthorDetailsProps> = ({
  index,
  scrollX,
  item
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [width / 2, 0, -width / 2],
            Extrapolation.CLAMP
          )
        }
      ],
      opacity: interpolate(
        scrollX.value,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0],
        Extrapolation.CLAMP
      )
    };
  });

  return (
    <Animated.View
      style={[
        {
          gap: 4,
          position: "absolute",
          width: "100%",
          height: "30%",
          alignItems: "center",
          paddingHorizontal: width * 0.1
        },
        rStyle
      ]}
    >
      <Text
        style={{
          fontSize: 18,
          color: "white",
          fontWeight: "700",
          textTransform: "capitalize"
        }}
      >
        {item.photographer}
      </Text>
      <Text
        style={{
          color: "#fff",
          opacity: 0.5,
          textAlign: "center"
        }}
      >
        {item.alt}
      </Text>
    </Animated.View>
  );
};
