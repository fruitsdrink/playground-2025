import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View style={styles.page}>
      <View>
        <Text>首页</Text>
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
