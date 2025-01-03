import { _habitLogsSize, _spacing } from "@/constants/layout";
import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import dayjs from "dayjs";
import { and, between, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function HabitLog({ habit }: { habit: typeof habits.$inferSelect }) {
  const { data } = useLiveQuery(
    db
      .select()
      .from(habitLogs)
      .where(
        and(
          eq(habitLogs.habit_id, habit.id),
          between(
            habitLogs.date,
            dayjs().startOf("month").toDate(),
            dayjs().endOf("month").toDate()
          )
        )
      )
  );

  const daysInMoth = useMemo(
    () => [...Array(dayjs().daysInMonth()).keys()],
    []
  );

  return (
    <View style={{ gap: _spacing }}>
      <View style={{ gap: _spacing }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: _spacing }}>
          {daysInMoth.map((day) => {
            const log = data.find((log) => {
              return dayjs(log.date).date() === day + 1;
            });

            const isFromFuture = dayjs().date() < day + 1;

            return (
              <Pressable
                key={`day-${day}-${habit.id}`}
                disabled={isFromFuture}
                style={{ opacity: isFromFuture ? 0.3 : 1 }}
                onPress={async () => {
                  const date = dayjs()
                    .set("date", day + 1)
                    .toDate();

                  if (log) {
                    await db.delete(habitLogs).where(eq(habitLogs.id, log.id));
                  } else {
                    await db.insert(habitLogs).values({
                      habit_id: habit.id,
                      date,
                      completed: true
                    });
                  }
                }}
              >
                <View
                  style={[
                    styles.log,
                    log?.completed &&
                      habit.color && {
                        backgroundColor: habit.color
                      }
                  ]}
                >
                  <Text style={{ fontSize: 12, opacity: 0.5 }}>{day + 1}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    width: _habitLogsSize,
    height: _habitLogsSize,
    borderRadius: _spacing,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center"
  }
});
