import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const HabitScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log({ id });
  return (
    <View>
      <Text>habit id</Text>
    </View>
  );
};

export default HabitScreen;
