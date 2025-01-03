import { HabitLog } from "@/components/HabitLog";
import { _spacing } from "@/constants/layout";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

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

  // const habit = data[0];
  return (
    <View style={{ padding: _spacing, flex: 1 }}>
      <Stack.Screen options={{ title: name }} />
      {data.length > 0 ? (
        <HabitLog habit={data[0]} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"small"} color={"#999"} />
        </View>
      )}
    </View>
  );
};

export default HabitScreen;
