import { ScrollView, StyleSheet, View } from "react-native";

type Props = {
  color: string;
};
export const ColorList = ({ color }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 0.8, 0.5].map((opacity) => {
        return (
          <View
            key={opacity.toString()}
            style={[
              styles.color,
              {
                backgroundColor: color,
                opacity
              }
            ]}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "100%"
  },
  color: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    borderCurve: "continuous",
    marginBottom: 15
  }
});
