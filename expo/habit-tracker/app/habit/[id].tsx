import { HabitLog } from "@/components/HabitLog";
import { _borderRadius, _buttonHeight, _spacing } from "@/constants/layout";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

const HabitScreen = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const { data } = useLiveQuery(
    db
      .select()
      .from(habits)
      .where(eq(habits.id, Number(id)))
  );

  // if (data.length === 0) {
  //   return null;
  // }

  const habit = data[0];
  return (
    <View style={{ padding: _spacing, flex: 1, gap: _spacing * 2 }}>
      <Stack.Screen options={{ title: name }} />
      <View style={{ flex: 1 }}>
        {habit ? (
          <HabitLog habit={habit} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"small"} color={"#999"} />
          </View>
        )}
      </View>
      <Pressable
        onPress={() => {
          Alert.alert(
            `Delete ${habit.name}`,
            "This action cannot be undone.\nAre you sure you want to delete this habit?",
            [
              { style: "cancel", text: "Cancel" },
              {
                style: "destructive",
                text: "Delete",
                onPress: () => {
                  db.delete(habits).where(eq(habits.id, habit.id)).execute();
                  router.dismissAll();
                },
              },
            ]
          );
        }}
      >
        <View
          style={{
            padding: _spacing,
            width: "100%",
            backgroundColor: "#c70039",
            minHeight: _buttonHeight,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: _borderRadius,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Delete Habit
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HabitScreen;
