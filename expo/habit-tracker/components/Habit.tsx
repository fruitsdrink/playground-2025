import { _spacing } from "@/constants/layout";
import { habits } from "@/db/schema";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { HabitLog } from "./HabitLog";

export function Habit({ habit }: { habit: typeof habits.$inferSelect }) {
  return (
    <View style={{ gap: _spacing }}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            {habit.name}
          </Text>
          {habit.description && <Text>{habit.description}</Text>}
        </View>
        <Link href={`/habit/${habit.id}`}>
          <ChevronRight />
        </Link>
      </View>
      <HabitLog habit={habit} />
    </View>
  );
}
