import { View, Text, Image, Button, type ViewProps } from "react-native";
import React, { useRef, useState } from "react";
import { Stack } from "expo-router";
import { fakerZH_CN as faker } from "@faker-js/faker";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut
} from "react-native-reanimated";
import { MotiView, MotiText } from "moti";

const _spacing = 4;
const _borderRadius = 8;
const _itemSize = 60;
const _stagger = 75;
const _loadingColor = "#ddd";
const _loadingColorWashed = "#eee";

faker.seed(22);
const generateData = () => {
  return {
    key: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({
      width: 80,
      height: 80,
      blur: 0
    })
  };
};

type Item = ReturnType<typeof generateData>;

const generateMockData = () => {
  return [...Array(faker.number.int({ min: 1, max: 5 })).keys()].map(() => {
    return generateData();
  });
};

const getRandomRotation = () => {
  return (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15;
};

export default function ReanimatedLayout() {
  const [data, setData] = useState<Item[]>(generateMockData());
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      <Stack.Screen
        options={{
          title: "布局动画",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20
        }}
      >
        <AvailabilityAnimation data={data} isLoading={isLoading} />
        <View style={{ marginTop: 20 }}>
          <Button
            title="Generate new data"
            onPress={() => {
              if (timer.current) clearTimeout(timer.current);

              setIsLoading(true);

              timer.current = setTimeout(() => {
                setIsLoading(false);
                setData(generateMockData());
              }, Math.random() * 1000 + 1000);
            }}
          />
        </View>
      </View>
    </>
  );
}

type AvailabilityAnimationProps = {
  data: Item[];
  isLoading: boolean;
};
function AvailabilityAnimation({
  data,
  isLoading
}: AvailabilityAnimationProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: _itemSize
      }}
    >
      <View
        style={{ flex: 0.6, justifyContent: "center", minHeight: _itemSize }}
      >
        {!isLoading ? (
          <Animated.Text
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
          >
            {data.length} available
          </Animated.Text>
        ) : (
          <Skeleton
            style={{
              width: "80%",
              height: _itemSize * 0.25,
              borderRadius: _borderRadius / 2,
              backgroundColor: _loadingColor
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          minHeight: -_itemSize
        }}
      >
        {!isLoading ? (
          data.map((item, index) => {
            return (
              <Animated.View
                key={item.key}
                style={{
                  zIndex: index
                }}
                entering={ZoomIn.springify()
                  .stiffness(200)
                  .damping(80)
                  .delay(index * _stagger)}
                exiting={ZoomOut.springify()
                  .stiffness(200)
                  .damping(80)
                  .delay(index * _stagger)}
              >
                <AvailabilityAnimationItem item={item} index={index} />
              </Animated.View>
            );
          })
        ) : (
          <LoadingSkeleton />
        )}
      </View>
    </View>
  );
}

type AvailabilityAnimationItemProps = {
  index: number;
  item: Item;
};
function AvailabilityAnimationItem({
  item,
  index
}: AvailabilityAnimationItemProps) {
  return (
    <View
      style={{
        width: _itemSize,
        aspectRatio: 1,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: "#fff",
        boxShadow: "0 0 7px rgba(0, 0, 0, 0.4)",
        marginLeft: index > 0 ? -_itemSize / 2 : 0,
        transform: [
          {
            rotate: `${getRandomRotation()}deg`
          }
        ]
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 0
        // },
        // shadowOpacity: 0.4,
        // shadowRadius: 7
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          borderRadius: _borderRadius
        }}
      />
    </View>
  );
}

function Skeleton({ style, ...rest }: ViewProps) {
  return (
    // <Animated.View
    //   style={style}
    //   {...rest}
    //   entering={FadeIn.springify().damping(80).stiffness(200)}
    //   exiting={FadeOut.springify().damping(80).stiffness(200)}
    // />
    <MotiView
      style={style}
      {...rest}
      from={{ backgroundColor: _loadingColor }}
      animate={{ backgroundColor: _loadingColorWashed }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true
      }}
      entering={FadeIn.springify().damping(80).stiffness(200)}
      exiting={FadeOut.springify().damping(80).stiffness(200)}
    />
  );
}

function LoadingSkeleton() {
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      {[...Array(3).keys()].map((index) => {
        return (
          <Skeleton
            key={index}
            style={{
              width: _itemSize,
              aspectRatio: 1,
              borderRadius: _borderRadius,
              backgroundColor: _loadingColor,
              borderWidth: _spacing,
              borderColor: "#fff",
              marginLeft: index === 0 ? 0 : -_itemSize / 2,
              transform: [
                {
                  rotate: `${getRandomRotation()}deg`
                }
              ]
            }}
          />
        );
      })}
    </View>
  );
}
