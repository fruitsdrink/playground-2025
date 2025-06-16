import { useAuth } from "@/lib/auth-context";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function IndexScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.page}>
      <View>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          退出
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
