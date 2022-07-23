import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
});

export const Home: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hello World</Text>
  </View>
);
