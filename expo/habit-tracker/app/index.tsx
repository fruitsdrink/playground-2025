import { AddHabit } from "@/components/AddHabit";
import { Backdrop } from "@/components/BlurredBackdrop";
import { Habit } from "@/components/Habit";
import { _spacing } from "@/constants/layout";

import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { asc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";

export default function HomeScreen() {
  const { data, error } = useLiveQuery(
    db.select().from(habits).orderBy(asc(habits.created_at)),
    []
  );
  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Backdrop onPress={() => {}} />
      <AddHabit />
      {/* <View style={{ backgroundColor: "white", padding: _spacing * 2 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Habits</Text>
      </View> */}
      <FlatList
        data={data}
        keyExtractor={(habit) => habit.id.toString()}
        automaticallyAdjustsScrollIndicatorInsets
        contentContainerStyle={{
          padding: _spacing * 2,
          gap: _spacing * 2,
        }}
        renderItem={({ item }) => <Habit key={item.id} habit={item} />}
      />
    </SafeAreaView>
  );
}
