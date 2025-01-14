import { useContext } from "react";
import { AuthContext } from "@/components/organisms/AuthProvider";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useRouter, Href } from "expo-router";

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const router = useRouter();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome! Please log in.</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/auth/login" as Href<"/auth/login">)}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/auth/signup" as Href<"/auth/signup">)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back, {user.email}!</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/profile" as Href<"/profile">)}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/auth/logout" as Href<"/auth/logout">)}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
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
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },
  button: {
    width: "60%",
    backgroundColor: "#04395E",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
