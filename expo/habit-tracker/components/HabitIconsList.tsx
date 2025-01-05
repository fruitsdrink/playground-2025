import { _borderRadius, _buttonIconSize, _spacing } from "@/constants/layout";
import { newHabit$ } from "@/state/habit";
import { habitIcons } from "@/utils/icons";
import { observer } from "@legendapp/state/react";
import { icons } from "lucide-react-native";
import { FlatList, Pressable } from "react-native";

export const HabitIconsList = observer(() => {
  const selectedIcon = newHabit$.icon.get();

  return (
    <FlatList
      numColumns={5}
      data={habitIcons}
      keyExtractor={(item) => item}
      contentContainerStyle={{
        gap: _spacing * 2,
        justifyContent: "center",
        alignItems: "center",
      }}
      columnWrapperStyle={{ gap: _spacing * 2 }}
      renderItem={({ item }) => {
        const Icon = icons[item];
        const isSelected = selectedIcon === item;
        return (
          <Pressable
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              width: _buttonIconSize,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: _borderRadius,
              borderWidth: 2,
              borderColor: isSelected ? "rgba(0,0,0,0.7)" : "transparent",
            }}
            onPress={() => {
              newHabit$.icon.set(item);
            }}
          >
            <Icon
              size={_buttonIconSize / 2}
              color={"#000"}
              opacity={isSelected ? 1 : 0.8}
            />
          </Pressable>
        );
      }}
    />
  );
});
