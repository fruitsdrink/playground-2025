import { type Href, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import type React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import type { Post } from "@/data/posts";
import { useVideoPlayer, VideoView } from "expo-video";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type LabListItemProps = {
  post: Post;
};

export const LabListItem: React.FC<LabListItemProps> = ({
  post: {
    title,
    desc,
    image,
    video,
    href,
    date,
    github,
    youtube,
    bilibili,
    tags,
    imageSizeType
  }
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 10
      }}
    >
      <View
        style={{
          borderWidth: 0,
          borderColor: "rgba(0,0,0,0.1)",
          borderRadius: 8,
          marginBottom: 20,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
          padding: 20,
          backgroundColor: "#333"
        }}
      >
        {video ? (
          <VideoListItem video={video} imageSizeType={imageSizeType} />
        ) : (
          <Image
            source={image}
            contentFit="cover"
            placeholder={{ blurhash }}
            transition={1000}
            style={{
              borderRadius: 8,
              width: "100%",
              aspectRatio:
                !imageSizeType || imageSizeType === "horizontal" ? 4 / 2 : 2 / 3
              // height: 300
            }}
          />
        )}
      </View>

      <Link href={href} asChild>
        <Pressable>
          <View className="flex-row justify-between items-center my-2">
            <View className="flex-row gap-1 items-center">
              <Text className="text-center">{title}</Text>
            </View>
            <View className="flex-row gap-1 items-center">
              <AntDesign name="calendar" size={16} color="black" />
              <Text className="text-base text-slate-600">{date}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
      {desc && <Text className="text-base text-gray-500">{desc}</Text>}
      {tags && (
        <View className="flex-row flex-wrap gap-1 my-2 w-full">
          {tags.map((tag) => (
            <View
              key={tag}
              className="px-2 py-1 text-sm rounded-full bg-slate-800"
            >
              <Text className="text-white">{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex-row gap-4">
        {github && (
          <Link href={github} asChild>
            <AntDesign name="github" size={24} color="black" />
          </Link>
        )}
        {youtube && (
          <Link href={youtube} asChild>
            <Entypo name="youtube-with-circle" size={24} color="black" />
          </Link>
        )}
        {bilibili && (
          <Link href={bilibili} asChild>
            <FontAwesome6 name="bilibili" size={24} color="black" />
          </Link>
        )}
      </View>
    </View>
  );
};

const VideoListItem = ({
  video,
  imageSizeType
}: {
  video: number;
  imageSizeType?: string;
}) => {
  const player = useVideoPlayer({ assetId: video }, (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <View>
      <VideoView
        style={{
          borderRadius: 8,
          width: "100%",
          aspectRatio:
            !imageSizeType || imageSizeType === "horizontal" ? 4 / 2 : 2 / 4
        }}
        player={player}
        contentFit="contain"
        nativeControls={false}
      />
    </View>
  );
};
