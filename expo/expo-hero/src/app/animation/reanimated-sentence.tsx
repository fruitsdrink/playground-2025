import {
  View,
  Text,
  TextStyle,
  TextProps,
  StyleSheet,
  StatusBar
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutUp,
  runOnJS,
  SlideInDown
} from "react-native-reanimated";
import { faker } from "@faker-js/faker";
import { MotiView } from "moti";
import { Image } from "expo-image";

const randomSentences: string[] = [];
for (let i = 0; i < 4; i++) {
  randomSentences.push(faker.lorem.sentence());
}

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const colors = [
  {
    background: "#2d003d",
    text: "#8a2be2"
  },
  {
    background: "#8a2be2",
    text: "#2d003d"
  },
  {
    background: "#00a6ff",
    text: "#001f3f"
  },
  {
    background: "#001f3f",
    text: "#00a6ff"
  },
  {
    background: "#3f1f00",
    text: "#ffa500"
  },
  {
    background: "#ffa500",
    text: "#3f1f00"
  },
  {
    background: "#faf0ca",
    text: "#0d3b66"
  },
  {
    background: "#0d3b66",
    text: "#faf0ca"
  },
  {
    background: "#2b2d42",
    text: "#ff6f61"
  },
  {
    background: "#ff6f61",
    text: "#2b2d42"
  },
  {
    background: "#28afb0",
    text: "#f6f7eb"
  },
  {
    background: "#f6f7eb",
    text: "#28afb0"
  },
  {
    background: "#ffd700",
    text: "#382c34"
  },
  {
    background: "#382c34",
    text: "#ffd700"
  },
  {
    background: "#7f4f24",
    text: "#d9bf77"
  },
  {
    background: "#d9bf77",
    text: "#7f4f24"
  },
  {
    background: "#4a7c59",
    text: "#d9d9d9"
  },
  {
    background: "#d9d9d9",
    text: "#4a7c59"
  }
];

const wallpapers = [
  "https://demo-source.imgix.net/canyon.jpg",
  "https://demo-source.imgix.net/mountains.jpg",
  "https://demo-source.imgix.net/scooter.jpg",
  "https://demo-source.imgix.net/snowboard.jpg",
  "https://demo-source.imgix.net/model.jpg"
];

export default function ReanimatedSentenceScreen() {
  const [index, setIndex] = useState(0);
  const [sentence, setSentence] = useState(randomSentences[index]);
  const currentColor = colors[index % (colors.length - 1)];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <StatusBar hidden />
      <View
        style={{
          flex: 1
        }}
      >
        <MotiView
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20
          }}
          animate={{
            backgroundColor: currentColor.background
          }}
        >
          {sentence && (
            <Animated.View
              key={`wallpaper-${index}`}
              style={StyleSheet.absoluteFillObject}
              entering={FadeIn.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
            >
              <Image
                source={{ uri: wallpapers[index] }}
                style={{ flex: 1, opacity: 0.3 }}
                // blurRadius={100}
                transition={500}
              />
            </Animated.View>
          )}
          <Sentence
            style={{
              fontSize: 52,
              lineHeight: 52 * 1.1,
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: -2,
              color: currentColor.text
            }}
            onEnterFinish={async () => {
              await wait(1000);
              setSentence("");
            }}
            onExitFinish={async () => {
              await wait(500);
              const newIndex = (index + 1) % randomSentences.length;
              setIndex(newIndex);
              setSentence(randomSentences[newIndex]);
            }}
          >
            {sentence}
          </Sentence>
        </MotiView>
      </View>
    </>
  );
}

type SentenceProps = {
  stagger?: number;
  onEnterFinish?: () => void;
  onExitFinish?: () => void;
} & TextProps;

const Sentence: React.FC<SentenceProps> = ({
  children,
  stagger = 100,
  style,
  onEnterFinish,
  onExitFinish,
  ...rest
}) => {
  if (typeof children !== "string") {
    throw new Error("Children must be a string");
  }

  const fontSize = (style as TextStyle).fontSize ?? 16;

  const words = (children as string)
    .split(" ")
    .filter((word) => word.trim().length > 0);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4
      }}
    >
      {words.map((word, index) => {
        return (
          <View
            key={`word-${word}-index-${index}`}
            style={{
              height: fontSize,
              // backgroundColor: "red"
              overflow: "hidden"
            }}
          >
            <Animated.Text
              style={[style, { position: "relative" }]}
              {...rest}
              entering={SlideInDown.springify()
                .damping(80)
                .stiffness(200)
                .delay(index * stagger)
                .withInitialValues({
                  originY: fontSize * 1.2
                })
                .withCallback((finished) => {
                  if (finished && index === words.length - 1 && onEnterFinish) {
                    runOnJS(onEnterFinish)();
                  }
                })}
              exiting={FadeOut.springify()
                .damping(80)
                .stiffness(200)
                // .delay(index * stagger)
                .withCallback((finished) => {
                  if (finished && index === words.length - 1 && onExitFinish) {
                    runOnJS(onExitFinish)();
                  }
                })}
            >
              {word}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};
