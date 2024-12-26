import { Stack } from "expo-router";
import { Dimensions, FlatList, View, Text, Pressable } from "react-native";
import type React from "react";
import { posts } from "@/data/posts";
import { LabListItem } from "@/components/LabListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";

const { width, height } = Dimensions.get("screen");
const _itemWidth = width;
const _itemHeight = height;

const sortedPost = posts
  .filter((item) => !item.isTop)
  .sort((a, b) => {
    // 按id倒序排序
    return Number.parseInt(b.id) - Number.parseInt(a.id);
  });

const topPosts = posts.filter((item) => item.isTop);

if (topPosts.length > 0) {
  sortedPost.unshift(...topPosts);
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const ref = useRef<FlatList>(null);

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "Expo Hero", headerShown: false }} />

      <FlatList
        ref={ref}
        data={sortedPost}
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: 20
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: "100%",
                height: _itemHeight
              }}
            >
              <LabListItem post={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        onPress={() => {
          ref.current?.scrollToOffset({
            offset: 0,
            animated: true
          });
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 20,
            right: insets.right + 20,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: "#333",
            zIndex: 100,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Text style={{ color: "#fff" }}>top</Text>
        </View>
      </Pressable>
    </View>
  );
}
