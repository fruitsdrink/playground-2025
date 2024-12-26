import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { icons } from "lucide-react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition
} from "react-native-reanimated";
import { type MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

const _spacing = 4;
const tabs = ["#ff005c", "#ffbd00", "#00b3e6", "#00cc96", "#ff005c"];

export default function ReanimatedTopTabs() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          title: "顶部Tab动画",
          headerBackTitle: "返回",
          headerShown: false
        }}
      />
      <SafeAreaView style={styles.container}>
        <Tabs
          data={[
            { icon: "LifeBuoy", label: "Buoy" },
            { icon: "Fish", label: "Fresh fish" },
            { icon: "Sailboat", label: "Sail" },
            { icon: "Ship", label: "Ship it" },
            { icon: "ShipWheel", label: "Manage it" }
          ]}
          onChange={(index) => setSelectedIndex(index)}
          selectedIndex={selectedIndex}
        />
        <LayoutAnimationConfig skipEntering>
          {/* LayoutAnimationConfig 解决初始化时，高度为全屏的高度问题 */}
          {/* skipEntering 作用是跳过首次布局进入动画 */}
          <Animated.View
            key={`tab-content-${selectedIndex}`}
            entering={FadeInRight.springify().damping(80).stiffness(200)}
            exiting={FadeOutRight.springify().damping(80).stiffness(200)}
            style={{
              backgroundColor: tabs[selectedIndex],
              flex: 1,
              borderRadius: 8
            }}
          />
        </LayoutAnimationConfig>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 12,
    gap: 12
  }
});

type IconNames = keyof typeof icons;
type TabItem = {
  icon: IconNames;
  label: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

const Tabs: React.FC<TabsProps> = ({
  data,
  selectedIndex,
  onChange,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd"
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: _spacing
      }}
    >
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <MotiView
            key={`${index.toString()}`}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor
            }}
            style={{
              borderRadius: 8,
              overflow: "hidden"
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={{
                padding: _spacing * 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: _spacing
              }}
            >
              <Icon
                name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor
                  // fill: isSelected ? activeColor : inactiveColor
                }}
              />
              <LayoutAnimationConfig skipEntering>
                {isSelected && (
                  <Animated.Text
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={{
                      color: isSelected ? activeColor : inactiveColor,
                      fontWeight: isSelected ? "bold" : "normal"
                    }}
                  >
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

type IconProp = {
  name: IconNames;
} & MotiProps;

const Icon: React.FC<IconProp> = ({ name, ...rest }) => {
  // @ts-ignore
  const IconComponent = motifySvg(icons[name])();

  return <IconComponent size={16} {...rest} />;
};
