import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  type LayoutChangeEvent
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function AnimatedTopTab() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <Stack.Screen options={{ title: "动画标签", headerShown: false }} />
      <TabScreen />
    </SafeAreaView>
  );
}

enum CustomTab {
  Tab1 = 0,
  Tab2 = 1
}

const TabScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState(CustomTab.Tab1);

  const buttons: TabButtonType[] = [{ title: "tab1" }, { title: "tab2" }];

  return (
    <View style={{ flex: 1 }}>
      <TabButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {selectedTab === CustomTab.Tab1 ? (
          <Text>Tab1 Content</Text>
        ) : (
          <Text>Tab2 Content</Text>
        )}
      </View>
    </View>
  );
};

type TabButtonType = {
  title: string;
};
type TabButtonsProps = {
  buttons: TabButtonType[];
  selectedTab: CustomTab;
  setSelectedTab: (tab: number) => void;
};
function TabButtons({ buttons, selectedTab, setSelectedTab }: TabButtonsProps) {
  const [dimensions, setDimensions] = React.useState({
    width: 100,
    height: 20
  });
  const buttonWidth = dimensions.width / buttons.length;
  const tabPositionX = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value
        }
      ]
    };
  });

  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width
    });
  };

  const handlePress = (index: number) => {
    setSelectedTab(index);
  };

  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  return (
    <View
      style={{
        backgroundColor: "#333",
        borderRadius: 0,
        justifyContent: "center"
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: "#fff",
            borderRadius: 8,
            marginHorizontal: 5,
            height: dimensions.height - 10,
            width: buttonWidth - 10
          },
          rStyle
        ]}
      />
      <View
        onLayout={onTabbarLayout}
        style={{
          flexDirection: "row"
        }}
      >
        {buttons.map((item, index) => {
          const color = selectedTab === index ? "#333" : "#fff";
          return (
            <Pressable
              key={`${index.toString()}`}
              style={{
                flex: 1,
                paddingVertical: 20
              }}
              onPress={() => {
                onTabPress(index);
              }}
            >
              <Text
                style={{
                  color: color,
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 14
                }}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
