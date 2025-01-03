import { _spacing } from "@/constants/layout";
import { habits } from "@/db/schema";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { HabitLog } from "./HabitLog";

export function Habit({ habit }: { habit: typeof habits.$inferSelect }) {
  return (
    <View style={{ gap: _spacing * 2 }}>
      <Link
        href={{
          pathname: `/habit/[id]`,
          params: {
            id: habit.id.toString(),
            name: habit.name
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: _spacing * 2
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600"
              }}
            >
              {habit.name}
            </Text>
            {habit.description && <Text>{habit.description}</Text>}
          </View>
          <ChevronRight color="rgba(0,0,0,0.2)" />
        </View>
      </Link>
      <HabitLog habit={habit} />
    </View>
  );
}
