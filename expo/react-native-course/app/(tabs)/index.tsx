import {
  client,
  COMPLETIONS_COLLECTION_ID,
  database,
  DATABASE_ID,
  HABITS_COLLECTION_ID,
  RealtimeResponse,
} from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, HabitCompletion } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ID, Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";
import { FREQUENCIES } from "./add-habit";

export default function IndexScreen() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const fetchHabits = useCallback(async () => {
    try {
      const res = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id || "")]
      );
      if (res.documents) {
        setHabits(res.documents as Habit[]);
      } else {
        setHabits([]);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }, [user?.$id]);

  const fetchTodayCompletions = useCallback(async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of the day
      const res = await database.listDocuments(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        [
          Query.equal("user_id", user?.$id || ""),
          Query.greaterThanEqual("completed_at", today.toISOString()),
        ]
      );

      const completedHabits = res.documents as HabitCompletion[];

      setCompletedHabits(completedHabits.map((c) => c.habit_id));
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }, [user?.$id]);

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await database.deleteDocument(DATABASE_ID, HABITS_COLLECTION_ID, habitId);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleCompleteHabit = async (habitId: string) => {
    if (!user || completedHabits.includes(habitId)) return;
    try {
      const currentDate = new Date().toISOString();

      await database.createDocument(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        ID.unique(),
        {
          habit_id: habitId,
          user_id: user?.$id,
          completed_at: currentDate,
        }
      );

      const habit = habits.find((h) => h.$id === habitId);
      if (!habit) return;
      await database.updateDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        habitId,
        {
          streak_count: habit.streak_count + 1,
          last_completed: currentDate,
        }
      );
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const isHabitCompleted = (habitId: string) => {
    return completedHabits.includes(habitId);
  };

  const renderRightActions = (habitId: string) => {
    return (
      <View style={styles.swipeActionRight}>
        {isHabitCompleted(habitId) ? (
          <Text style={{ color: "#fff" }}>完成</Text>
        ) : (
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={32}
            color="#fff"
          />
        )}
      </View>
    );
  };
  const renderLeftActions = () => {
    return (
      <View style={styles.swipeActionLeft}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={32}
          color="#fff"
        />
      </View>
    );
  };

  useEffect(() => {
    (() => {
      const habitChannel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
      const unSubscription = client.subscribe(
        habitChannel,
        (response: RealtimeResponse) => {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update"
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete"
            )
          ) {
            fetchHabits();
          }
        }
      );
      const completionChannel = `databases.${DATABASE_ID}.collections.${COMPLETIONS_COLLECTION_ID}.documents`;
      const unCompletionSubscription = client.subscribe(
        completionChannel,
        (response: RealtimeResponse) => {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            fetchTodayCompletions();
          }
        }
      );

      fetchHabits();
      fetchTodayCompletions();

      return () => {
        unSubscription();
        unCompletionSubscription();
      };
    })();
  }, [fetchHabits, fetchTodayCompletions, user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          今日打卡
        </Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          退出
        </Button>
      </View>
      {habits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>暂无数据</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {habits.map((habit, key) => (
            <Swipeable
              ref={(ref) => {
                swipeableRefs.current[habit.$id] = ref;
              }}
              key={key}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={renderLeftActions}
              renderRightActions={() => renderRightActions(habit.$id)}
              onSwipeableOpen={async (direction) => {
                if (direction === "left") {
                  await handleDeleteHabit(habit.$id);
                }
                if (direction === "right") {
                  await handleCompleteHabit(habit.$id);
                }
                swipeableRefs.current[habit.$id]?.close();
              }}
            >
              <Surface
                key={habit.$id}
                style={[
                  styles.card,
                  isHabitCompleted(habit.$id) && styles.cardCompleted,
                ]}
                elevation={0}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <Text style={styles.cardDescription}>
                    {habit.description}
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.streakBadge}>
                      <MaterialCommunityIcons
                        name="fire"
                        size={18}
                        color={"#FF5722"}
                      />
                      <Text style={styles.streakText}>
                        {habit.streak_count} 次
                      </Text>
                    </View>
                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>
                        {
                          FREQUENCIES.find((fr) => fr.value === habit.frequency)
                            ?.label
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </Surface>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666",
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginTop: 20,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#4caf50",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
});
