import { _spacing } from "@/constants/layout";
import { habits } from "@/db/schema";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { memo } from "react";
import { Text, View } from "react-native";
import { CurrentDayStreak } from "./CurrentDayStreak";
import { HabitIcon } from "./HabitIcon";
import { HabitLog } from "./HabitLog";

export const Habit = memo(
  ({ habit }: { habit: typeof habits.$inferSelect }) => {
    // console.log("re-render", habit.id);
    return (
      <View style={{ gap: _spacing * 2 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: _spacing * 2,
          }}
        >
          <Link
            href={{
              pathname: `/habit/[id]`,
              params: {
                id: habit.id.toString(),
                name: habit.name,
              },
            }}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <HabitIcon habit={habit} color={habit.color ?? undefined} />
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
          </Link>
          <CurrentDayStreak habit={habit} />
          <ChevronRight color="rgba(0,0,0,0.2)" />
        </View>
        <HabitLog habit={habit} />
      </View>
    );
  }
);
