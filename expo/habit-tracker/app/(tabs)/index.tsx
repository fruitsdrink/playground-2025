import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import { and, between, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import dayjs from "dayjs";

function HabitLogs({ habit }: { habit: typeof habits.$inferSelect }) {
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
    <View style={{ gap: 8 }}>
      <Text
        style={{
          fontStyle: "italic",
        }}
      >
        HabitLog for {habit.id}
      </Text>
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
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
                  if (log) {
                    await db.delete(habitLogs).where(eq(habitLogs.id, log.id));
                  } else {
                    await db.insert(habitLogs).values({
                      habit_id: habit.id,
                      date: dayjs()
                        .set("date", day + 1)
                        .toDate(),
                      completed: true,
                    });
                  }
                }}
              >
                <View
                  style={[
                    styles.log,
                    log?.completed &&
                      habit.color && {
                        backgroundColor: habit.color,
                      },
                  ]}
                >
                  <Text style={{ fontSize: 12, opacity: 0 }}>{day + 1}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function Habit({ habit }: { habit: typeof habits.$inferSelect }) {
  return (
    <View style={{ gap: 4 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {habit.name}
      </Text>
      <HabitLogs habit={habit} />
    </View>
  );
}

function AddHabit() {
  const [name, setName] = useState("");
  const ref = useRef<TextInput>(null);

  return (
    <View style={{ marginVertical: 20, padding: 20 }}>
      <TextInput
        ref={ref}
        placeholder="Add a habit"
        defaultValue={name}
        onChangeText={setName}
      />
      <Button
        title="Add Habit"
        onPress={() => {
          db.insert(habits)
            .values({
              name,
              color: "turquoise",
              description: "Random description",
            })
            .finally(() => {
              ref.current?.clear();
              ref.current?.blur();
            });
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const { data, error } = useLiveQuery(db.select().from(habits));
  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <AddHabit />
        <View style={{ padding: 8, marginBottom: 50 }}>
          <Text
            style={{
              fontSize: 32,
              marginBottom: 12,
              opacity: 0.3,
              fontWeight: "700",
            }}
          >
            Habits
          </Text>
          <View style={{ gap: 8 }}>
            {data.map((habit) => (
              <Habit key={habit.id} habit={habit} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  log: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
});
