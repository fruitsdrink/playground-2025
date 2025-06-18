import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = [
  {
    value: "daily",
    label: "每天",
  },
  {
    value: "weekly",
    label: "每周",
  },
  {
    value: "monthly",
    label: "每月",
  },
] as const;

type Frequency = (typeof FREQUENCIES)[number]["value"];

export default function AddHabitScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  const { styles } = useStyle();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await database.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );

      router.back();
    } catch (error) {
      console.error("添加习惯失败:", error);
      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("添加习惯失败，请稍后再试");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={"标题"}
        mode="outlined"
        style={styles.input}
        onChangeText={setTitle}
      />
      <TextInput
        label={"描述"}
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          multiSelect={false}
          onValueChange={(value) => {
            setFrequency(value);
          }}
          value={frequency} // Default selected value
          buttons={FREQUENCIES.map((freq) => ({
            value: freq.value,
            label: freq.label,
          }))}
        />
      </View>
      <Button
        mode="contained"
        disabled={!title || !description}
        onPress={handleSubmit}
      >
        添加习惯
      </Button>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const useStyle = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    input: {
      marginBottom: 16,
    },
    frequencyContainer: {
      marginBottom: 24,
    },
    error: {
      color: theme.colors.error,
      marginTop: 16,
    },
  });
  return { styles };
};
