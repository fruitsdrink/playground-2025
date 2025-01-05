import {
  _borderRadius,
  _buttonHeight,
  _hitslop,
  _spacing,
  screen,
} from "@/constants/layout";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { newHabit$ } from "@/state/habit";
import { isFabOpen$ } from "@/state/misc";
import { observer } from "@legendapp/state/react";
import { Minus, Plus } from "lucide-react-native";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
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
        placeholder="Title (Drink water, Exercise, etc.)"
        defaultValue={newHabit$.name.peek()}
        onChangeText={(text) => newHabit$.name.set(text)}
        style={styles.input}
      />
      <TextInput
        ref={ref}
        autoCapitalize={"none"}
        autoCorrect={false}
        autoComplete="off"
        placeholder="Description (Optional)"
        defaultValue={newHabit$.description.peek()}
        onChangeText={(text) => newHabit$.description.set(text)}
        style={styles.input}
      />
      <Text style={styles.p}>Select a color for your habit.</Text>
      <HabitColorList />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.p}>Times per day</Text>
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: _spacing * 2,
          }}
          // layout={LinearTransition.springify().damping(80).stiffness(200)}
        >
          <Pressable
            disabled={newHabit$.count.peek() === 1}
            hitSlop={_hitslop}
            style={[
              styles.button,
              {
                opacity: newHabit$.count.peek() === 1 ? 0.2 : 1,
              },
            ]}
            onPress={() => {
              newHabit$.count.set(newHabit$.count.peek() - 1);
            }}
          >
            <Minus size={16} color={"#000"} />
          </Pressable>

          <Animated.Text
            style={[
              styles.p,
              {
                fontVariant: ["tabular-nums"],
                width: _spacing * 4,
                textAlign: "center",
                letterSpacing: -1,
              },
            ]}
            key={`number-${newHabit$.count.get()}`}
            entering={FadeInDown.springify().damping(80).stiffness(200)}
            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
          >
            {newHabit$.count.get()}
          </Animated.Text>

          <Pressable
            hitSlop={_hitslop}
            style={[styles.button]}
            onPress={() => {
              newHabit$.count.set(newHabit$.count.peek() + 1);
            }}
          >
            <Plus size={16} color={"#000"} />
          </Pressable>
        </Animated.View>
      </View>
      <Pressable
        onPress={() => {
          const { name, description, color, count } = newHabit$.peek();
          db.insert(habits)
            .values({
              name,
              color,
              description,
              count,
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
  button: {
    backgroundColor: "lightgrey",
    borderRadius: _spacing,
    padding: _spacing / 2,
  },
});
