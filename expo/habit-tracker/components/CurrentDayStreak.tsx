import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import dayjs from "dayjs";
import { and, between, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export const CurrentDayStreak = ({
  habit,
}: {
  habit: typeof habits.$inferSelect;
}) => {
  const { data } = useLiveQuery(
    db
      .select()
      .from(habitLogs)
      .where(
        and(
          eq(habitLogs.habit_id, habit.id),
          between(
            habitLogs.date,
            dayjs().startOf("day").toDate(),
            dayjs().endOf("day").toDate()
          )
        )
      )
      // .orderBy(desc(habitLogs.date))
      .limit(1),
    [habit.id]
  );
  const currentLog = data?.[0];
  const date = useMemo(() => dayjs().toDate(), []);

  return (
    <View>
      <Pressable
        onPress={async () => {
          if (currentLog) {
            const newCount = (currentLog.count ?? 0) + 1;
            db.update(habitLogs)
              .set({
                completed:
                  newCount > habit.count! ? false : newCount === habit.count!,
                count: newCount > habit.count! ? 0 : newCount,
              })
              .where(eq(habitLogs.id, currentLog.id))
              .execute();
            // await db.delete(habitLogs).where(eq(habitLogs.id, log.id));
          } else {
            await db.insert(habitLogs).values({
              habit_id: habit.id,
              date,
              completed: true,
              count: 1,
            });
          }
        }}
      >
        <View
          style={{
            backgroundColor: habit.color || "#000",
            height: 32,
            width: 32,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            {currentLog?.count ?? 0}/{habit.count}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
