import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "@/components/organisms/SignUpForm";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
