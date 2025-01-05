import { _habitLogsSize, _spacing } from "@/constants/layout";
import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import dayjs from "dayjs";
import { and, between, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

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
              <View
                key={`day-${day}-${habit.id}`}
                onTouchStart={async () => {
                  if (isFromFuture) {
                    return;
                  }
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
                style={[
                  styles.log,
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
