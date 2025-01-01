import { _buttonHeight, _spacing } from "@/constants/layout";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { isFabOpen$ } from "@/state/misc";
import { observer } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { FabButton } from "./FabButton";

export const AddHabit = observer(() => {
  const [name, setName] = useState("");
  const isOpen = isFabOpen$.get();

  const ref = useRef<TextInput>(null);

  return (
    <FabButton
      onPress={() => {
        isFabOpen$.toggle();
      }}
      isOpen={isOpen}
      duration={500}
    >
      <TextInput
        ref={ref}
        placeholder="Add a habit"
        defaultValue={name}
        onChangeText={setName}
      />
      <Pressable
        onPress={() => {
          db.insert(habits)
            .values({
              name,
              color: "turquoise",
              description: "Random description"
            })
            .finally(() => {
              ref.current?.clear();
              ref.current?.blur();
            });
        }}
      >
        <View
          style={{
            padding: _spacing,
            height: _buttonHeight,
            backgroundColor: "gold",
            borderRadius: _spacing * 4,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontWeight: "500" }}>Add new habit</Text>
        </View>
      </Pressable>
    </FabButton>
  );
});
