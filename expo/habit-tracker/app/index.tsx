import { AddHabit } from "@/components/AddHabit";
import { Habit } from "@/components/Habit";
import { _spacing } from "@/constants/layout";

import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { data, error } = useLiveQuery(db.select().from(habits));
  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddHabit />
      <ScrollView>
        <View style={{ padding: _spacing * 2 }}>
          <Text
            style={{
              fontSize: 32,
              marginBottom: 12,
              opacity: 0.3,
              fontWeight: "700"
            }}
          >
            Habits
          </Text>
          <View style={{ gap: _spacing * 2 }}>
            {data.map((habit) => (
              <Habit key={habit.id} habit={habit} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
