import PrivateRoute from "@/components/organisms/PrivateRoute";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <PrivateRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your profile!</Text>
      </View>
    </PrivateRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    margin: 40,
  },
});
