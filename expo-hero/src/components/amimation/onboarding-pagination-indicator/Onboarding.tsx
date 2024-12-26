import type React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutUp,
  LinearTransition
} from "react-native-reanimated";
import { Pagination } from "./Pagination";
import { _spacing } from "./constants";

type OnboardingProps = {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
};

export const Onboarding: React.FC<OnboardingProps> = ({
  total,
  selectedIndex,
  onIndexChange
}) => {
  return (
    <View style={{ padding: _spacing, gap: _spacing * 2 }}>
      <Pagination selectedIndex={selectedIndex} total={total} />

      <View
        style={{
          flexDirection: "row",
          gap: _spacing
        }}
      >
        {selectedIndex > 0 && (
          <Button
            style={{
              backgroundColor: "#ddd"
            }}
            onPress={() => onIndexChange(selectedIndex - 1)}
          >
            <Text>上一步</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "#036bfb",
            flex: 1
          }}
          onPress={() => {
            if (selectedIndex === total - 1) return;
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              style={{
                color: "#fff"
              }}
              key={"finish"}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              完成
            </Animated.Text>
          ) : (
            <Animated.Text
              style={{
                color: "#fff"
              }}
              key={"next"}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              下一步
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};
