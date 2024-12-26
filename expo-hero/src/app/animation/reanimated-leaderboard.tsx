import { View, Text, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Animated, {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  type SharedValue
} from "react-native-reanimated";

const users = [
  { name: "Alice", score: 12 },
  { name: "Bob", score: 22 },
  { name: "Charlie", score: 4 },
  { name: "Catalin", score: 15 },
  { name: "Adam", score: 33 },
  { name: "David", score: 10 },
  { name: "Eve", score: 31 }
];
const _avatarSize = 28;
const _spacing = 4;
const _stagger = 200;

type User = (typeof users)[0];

export default function ReanimatedLeaderboard() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "排行榜",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <LeaderBoard />
      </View>
    </>
  );
}

function LeaderBoard() {
  const _anim = useSharedValue(0);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          gap: _spacing,
          justifyContent: "flex-end",
          alignItems: "flex-end"
          // height: 200
        }}
      >
        {users.map((user, index) => {
          return (
            <Place
              key={index.toString()}
              user={user}
              index={index}
              anim={_anim}
              onFinished={
                index === users.length - 1
                  ? () => {
                      _anim.value = 1;
                      // console.log("finished");
                    }
                  : null
              }
            />
          );
        })}
      </View>
    </View>
  );
}

type PlaceProps = {
  user: User;
  index: number;
  anim: SharedValue<number>;
  onFinished: (() => void) | null;
};
function Place({ user, index, anim, onFinished }: PlaceProps) {
  const _anim = useDerivedValue(() => {
    return withDelay(
      index * _stagger,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200
      })
    );
  }, [anim]);

  const stylez = useAnimatedStyle(() => {
    return {
      // height: user.score * 3 * _anim.value
      height: interpolate(
        _anim.value,
        [0, 1],
        [_avatarSize, Math.max(user.score * 3, _avatarSize + _spacing)]
      ),
      backgroundColor:
        index === 4
          ? interpolateColor(
              _anim.value,
              [0, 1],
              ["rgba(0,0,0,0.1)", "turquoise"]
            )
          : "rgba(0,0,0,0.1)"
    };
  });

  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.5, 1], [0, 0, 1])
    };
  });

  return (
    <Animated.View
      style={{ alignItems: "center" }}
      entering={FadeInRight.delay(index * _stagger)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback((finished) => {
          if (finished && onFinished) {
            runOnJS(onFinished)();
          }
        })}
      // style={{
      //   transform: [{ translateY: index * _stagger }]
      // }}
    >
      <Animated.Text
        style={[
          {
            fontSize: 7,
            fontWeight: "700"
          },
          textStylez
        ]}
      >
        {user.score}
      </Animated.Text>
      <Animated.View
        style={[
          {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: _avatarSize,
            // width: _avatarSize,
            height: _avatarSize
          },
          stylez
        ]}
      >
        <View
          style={{
            width: _avatarSize,
            aspectRatio: 1
          }}
        >
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${user.name}` }}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: _avatarSize / 2
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}
