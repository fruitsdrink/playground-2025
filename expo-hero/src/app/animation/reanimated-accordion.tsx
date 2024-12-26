import {
  View,
  Text,
  type ViewProps,
  ActivityIndicator,
  Pressable,
  ScrollView
} from "react-native";
import type React from "react";
import { Stack } from "expo-router";
import { faker } from "@faker-js/faker";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  LinearTransition,
  type AnimatedProps
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

const _spacing = 20;
const _dummySentences = [...Array(20).keys()].map(() => {
  return faker.company.catchPhrase();
});

type Quote = {
  id: number;
  quote: string;
  author: string;
};

const queryClient = new QueryClient();

export default function ReanimatedAccordionScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <Stack.Screen
          options={{
            title: "手风琴",
            headerBackTitle: "返回"
          }}
        />
        <TogglePage />
      </View>
    </QueryClientProvider>
  );
}

const TogglePage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          gap: _spacing,
          paddingHorizontal: _spacing
        }}
      >
        <View style={{ height: _spacing / 4 }} />
        <DummyToggle title="Hello World" index={0} />
        <DummyToggle title="Hello React Native" index={1} />
        <DummyToggle title="Hello Expo" index={2} />
        <Animated.View
          style={{
            padding: 12,
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: _spacing
          }}
          layout={LinearTransition.springify().damping(80).stiffness(200)}
        >
          {_dummySentences.slice(10, -1).map((sentence, index) => {
            return <Text key={`second-${index.toString()}`}>{sentence}</Text>;
          })}
        </Animated.View>
      </View>
    </ScrollView>
  );
};

type DummyToggleProps = {
  title: string;
  index: number;
};
const DummyToggle = ({ title, index }: DummyToggleProps) => {
  const [isActive, setIsActive] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["DummyData", index, isActive],
    enabled: isActive,
    queryFn: async () => {
      const data = (await fetch(
        `https://dummyjson.com/quotes?limit=${
          Math.floor(Math.random() * 3) + 2
        }&skip=${Math.floor(Math.random() * 20)}`
      ).then((res) => res.json())) as Promise<{ quotes: Quote[] }>;

      // console.log((await data).comments);
      // await wait(3000);
      return data;
    }
  });

  // console.log({ isLoading, isRefetching, isFetching });
  // console.log({ data });

  useEffect(() => {
    if (!isActive) {
      queryClient.resetQueries({
        queryKey: ["DummyData", index, true]
      });
    }
  }, [isActive, index]);

  return (
    <Toggle style={{ borderRadius: _spacing / 2 }}>
      <View style={{ gap: _spacing / 2 }}>
        <Pressable
          onPress={() => {
            setIsActive(!isActive);
          }}
        >
          <Text style={{ color: "#fff" }}>{title}</Text>
        </Pressable>
        {isActive && (
          <Animated.View
            style={{
              width: "100%",
              borderRadius: _spacing / 2,
              padding: _spacing / 2
            }}
            entering={FadeInDown.springify().damping(80).stiffness(200)}
            exiting={FadeOutDown.springify().damping(80).stiffness(200)}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            {isFetching ? (
              <ActivityIndicator size={"small"} color={"#fff"} />
            ) : (
              <View style={{ gap: _spacing / 2 }}>
                {data?.quotes?.map((quote) => {
                  return (
                    <View key={quote.id.toString()}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          opacity: 0.7,
                          fontFamily: "Menlo"
                        }}
                      >
                        {quote.quote}
                      </Text>
                      <Text style={{ color: "#fff" }}>{quote.author}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </Animated.View>
        )}
      </View>
    </Toggle>
  );
};

type ToggleProps = AnimatedProps<ViewProps> & {
  children: React.ReactNode;
};
const Toggle = ({ children, style, ...rest }: ToggleProps) => {
  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#333",
          padding: 20,
          overflow: "hidden"
        },
        style
      ]}
      {...rest}
      layout={LinearTransition.springify().damping(80).stiffness(200)}
    >
      {children}
    </Animated.View>
  );
};
