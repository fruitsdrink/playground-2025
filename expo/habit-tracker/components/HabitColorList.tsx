import { habitColors } from "@/constants/Colors";
import { _habitLogsSize, _spacing } from "@/constants/layout";
import { newHabit$ } from "@/state/habit";
import { observer } from "@legendapp/state/react";
import { Check } from "lucide-react-native";
import { Pressable, View } from "react-native";
import Amimated, { ZoomIn, ZoomOut } from "react-native-reanimated";

export const HabitColorList = observer(() => {
  const selectedColor = newHabit$.color.get();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: _spacing
      }}
    >
      {habitColors.map((color, index) => {
        const isSelected = selectedColor === color;
        return (
          <Pressable
            key={`${color}-${index}`}
            onPress={() => {
              newHabit$.color.set(color);
            }}
            style={{
              // borderWidth: 1,
              // borderColor: isSelected ? color : "transparent",
              borderRadius: _spacing + 2,
              padding: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: _habitLogsSize,
                aspectRatio: 1,
                borderRadius: _spacing,
                backgroundColor: color,
                position: "relative"
              }}
            />
            {isSelected && (
              <Amimated.View
                entering={ZoomIn.springify().damping(80).stiffness(200)}
                exiting={ZoomOut.springify().damping(80).stiffness(200)}
                style={{
                  position: "absolute",
                  width: "70%",
                  aspectRatio: 1,
                  borderRadius: _spacing,
                  backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center"
                  // bottom: -2,
                  // right: -2
                }}
              >
                <Check
                  size={10}
                  color={color}
                  fill={"transparent"}
                  strokeWidth={3}
                />
              </Amimated.View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
});
