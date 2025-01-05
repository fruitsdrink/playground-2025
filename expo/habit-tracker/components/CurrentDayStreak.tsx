import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Text, View } from "react-native";

export const CurrentDayStreak = ({
  habit,
}: {
  habit: typeof habits.$inferSelect;
}) => {
  const { data } = useLiveQuery(
    db.select().from(habitLogs).where(eq(habitLogs.habit_id, habit.id)).limit(1)
  );
  const currentDay = data?.[0];
  console.log(currentDay);
  return (
    <View>
      <Text>
        {currentDay?.count ?? 0} / {habit.count}
      </Text>
    </View>
  );
};
