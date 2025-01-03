import {
  _borderRadius,
  _buttonHeight,
  _spacing,
  screen,
} from "@/constants/layout";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { newHabit$ } from "@/state/habit";
import { isFabOpen$ } from "@/state/misc";
import { observer } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FabButton } from "./FabButton";
import { HabitColorList } from "./HabitColorList";

export const AddHabit = observer(() => {
  const [name, setName] = useState("");
  const isOpen = isFabOpen$.get();

  const ref = useRef<TextInput>(null);

  const { bottom } = useSafeAreaInsets();

  return (
    <FabButton
      title="Add habit"
      onPress={() => {
        isFabOpen$.toggle();
      }}
      panelStyle={{
        position: "absolute",
        right: _borderRadius,
        bottom: bottom + _borderRadius,
      }}
      openedSize={screen.width - _borderRadius * 2}
      isOpen={isOpen}
      duration={500}
    >
      <Text style={styles.p}>A habit day, keeps the doctor away.</Text>
      <TextInput
        ref={ref}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoComplete="off"
        placeholder="Habit name"
        defaultValue={newHabit$.name.peek()}
        onChangeText={(text) => newHabit$.name.set(text)}
        style={styles.input}
      />
      <TextInput
        ref={ref}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoComplete="off"
        placeholder="Habit description"
        defaultValue={newHabit$.description.peek()}
        onChangeText={(text) => newHabit$.description.set(text)}
        style={styles.input}
      />
      <Text style={styles.p}>Select a color for your habit.</Text>
      <HabitColorList />
      <Pressable
        onPress={() => {
          const { name, description, color } = newHabit$.peek();
          db.insert(habits)
            .values({
              name,
              color,
              description,
            })
            .finally(() => {
              isFabOpen$.set(false);
              newHabit$.clear();
              ref.current?.blur();
            });
        }}
      >
        <View
          style={{
            padding: _spacing,
            height: _buttonHeight,
            backgroundColor: "gold",
            borderRadius: _borderRadius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>Add new habit</Text>
        </View>
      </Pressable>
    </FabButton>
  );
});

const styles = StyleSheet.create({
  input: {
    height: _buttonHeight,
    paddingHorizontal: _spacing * 2,
    borderRadius: _borderRadius,
    backgroundColor: "#f0f0f0",
  },
  p: {
    color: "white",
    opacity: 0.8,
  },
});
