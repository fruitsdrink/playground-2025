import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const _imageWidth = width * 0.75;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;

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
export default function ReanimatedWallpaperCarousel() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Screen
        options={{
          title: "视差轮播图",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <PexelsWallPaper />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

const PexelsWallPaper = () => {
  const scrollX = useSharedValue(0);

  const { data, isFetching } = useQuery<SearchPayload>({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY
        }
      }).then((res) => res.json());
      // console.log(res);
      return res;
    }
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / (_imageWidth + _spacing);
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos.map((photo, index) => {
          return (
            <BackdropPhoto
              key={photo.id}
              photo={photo}
              index={index}
              scrollX={scrollX}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data?.photos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        style={{
          flexGrow: 0
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2
        }}
        decelerationRate={"fast"}
        snapToInterval={_imageWidth + _spacing}
        renderItem={({ item, index }) => {
          return <WallPaperItem item={item} index={index} scrollX={scrollX} />;
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
};

const WallPaperItem = ({
  item,
  index,
  scrollX
}: {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6]
          )
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15]
          )}deg`
        }
      ]
    };
  });
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        borderRadius: 16,
        overflow: "hidden"
      }}
    >
      <Animated.Image
        source={{ uri: item.src.large }}
        style={[
          {
            flex: 1
          },
          rStyle
        ]}
      />
    </View>
  );
};

const BackdropPhoto = ({
  photo,
  index,
  scrollX
}: {
  photo: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      )
    };
  });
  return (
    <Animated.Image
      source={{ uri: photo.src.large }}
      style={[StyleSheet.absoluteFillObject, rStyle]}
      blurRadius={50}
    />
  );
};
