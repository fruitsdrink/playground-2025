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
      .orderBy(habitLogs.date),
    [habit.id]
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
            const hasLogs = log?.completed || log?.count;

            return (
              <Pressable
                key={`day-${day}-${habit.id}`}
                disabled={isFromFuture}
                style={{ opacity: isFromFuture ? 0.5 : 1 }}
                onPress={async () => {
                  const date = dayjs()
                    .set("date", day + 1)
                    .toDate();

                  if (log) {
                    const newCount = (log.count ?? 0) + 1;
                    db.update(habitLogs)
                      .set({
                        completed:
                          newCount > habit.count!
                            ? false
                            : newCount === habit.count!,
                        count: newCount > habit.count! ? 0 : newCount,
                      })
                      .where(eq(habitLogs.id, log.id))
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
                  style={[
                    styles.log,
                    // (log?.completed || log?.count! > 0) &&
                    //   habit.color && {
                    //     backgroundColor: habit.color,
                    //   },
                  ]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor: hasLogs
                          ? habit.color ?? "lightgrey"
                          : "lightgrey",
                        opacity: hasLogs
                          ? (log?.count ?? 0) / (habit.count! ?? 1)
                          : 1,
                      },
                    ]}
                  />

                  <Text style={{ fontSize: 10, opacity: 0.5 }}>
                    {day + 1} {log?.count ?? 0}
                  </Text>
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
    alignItems: "center",
    overflow: "hidden",
  },
});
