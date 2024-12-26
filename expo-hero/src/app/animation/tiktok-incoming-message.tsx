import { View, Text, type ListRenderItem, FlatList, Image } from "react-native";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { faker } from "@faker-js/faker";
import Animated, {
  FadeInDown,
  type FlatListPropsWithLayout,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring
} from "react-native-reanimated";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const chatSpeed = {
  slow: [1000, 500],
  medium: [500, 500],
  fast: [250, 250],
  instant: [50, 100]
};

const MAX_MESSAGES = 6;
faker.seed(12);

const generateMessage = () => {
  return {
    key: faker.string.uuid(),
    content: faker.commerce.price({ min: 5, max: 1000, dec: 2, symbol: "$" }),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    user: {
      name: faker.internet.username(),
      avatar: faker.image.avatarGitHub()
    }
  };
};

type ChatItem = ReturnType<typeof generateMessage>;

export default function TikTokIncomingMessageScreen() {
  // const [messages, setMessages] = useState<ChatItem[]>(
  //   [...Array(10).keys()].map(generateMessage)
  // );
  const [messages, setMessages] = useState<ChatItem[]>([]);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [speed, setSpeed] = useState<keyof typeof chatSpeed>("slow");

  useEffect(() => {
    const generateData = () => {
      if (timeout.current) clearTimeout(timeout.current);
      const selectedSpeed = chatSpeed[speed];
      const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1];

      timeout.current = setTimeout(() => {
        setMessages((data) => {
          return [generateMessage(), ...data];
        });

        generateData();
      }, timer);
    };

    generateData();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [speed]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "TikTok消息动画",
          headerBackTitle: "返回"
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <TikTokMessage
          data={messages}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  gap: 4,
                  alignItems: "flex-start",
                  padding: 4 * 2,
                  borderRadius: 12
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: 16,
                      aspectRatio: 1,
                      borderRadius: 24
                    }}
                    source={{ uri: item.user.avatar }}
                  />
                  <Text
                    style={{
                      fontSize: 12
                    }}
                  >
                    {item.user.name}
                  </Text>
                </View>

                {/* description */}
                <View
                  style={{
                    backgroundColor: "#ddd",
                    padding: 4 * 2,
                    borderRadius: 8
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SegmentedControl
            values={Object.keys(chatSpeed)}
            style={{ width: 300 }}
            selectedIndex={Object.keys(chatSpeed).indexOf(speed)}
            onChange={(event) => {
              setSpeed(event.nativeEvent.value as keyof typeof chatSpeed);
            }}
          />
        </View>
      </View>
    </>
  );
}

function AnimatedItem({
  index,
  children
}: {
  index: number;
  children: React.ReactNode;
}) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, { damping: 80, stiffness: 200 });
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES])
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.springify()
        .damping(80)
        .stiffness(200)
        .withInitialValues({
          opacity: 0,
          transform: [{ translateY: 100 }]
        })}
    >
      <Animated.View style={rStyle}>{children}</Animated.View>
    </Animated.View>
  );
}

type TikTokMessageProps<T> = FlatListPropsWithLayout<T> & {
  renderItem: ListRenderItem<T>;
};
function TikTokMessage<T>({ renderItem, ...rest }: TikTokMessageProps<T>) {
  return (
    <Animated.FlatList
      renderItem={(props) => {
        return (
          <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
        );
      }}
      inverted
      itemLayoutAnimation={LinearTransition.springify()
        .damping(80)
        .stiffness(200)}
      {...rest}
    />
  );
}
