import { _spacing } from "@/constants/layout";
import { habits } from "@/db/schema";
import { Text, View } from "react-native";
import { HabitLog } from "./HabitLog";

export function Habit({ habit }: { habit: typeof habits.$inferSelect }) {
  return (
    <View style={{ gap: _spacing }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600"
        }}
      >
        {habit.name}
      </Text>
      <Text>{habit.description}</Text>
      <HabitLog habit={habit} />
    </View>
  );
}
