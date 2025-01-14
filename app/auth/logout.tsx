import { View, StyleSheet, Pressable, Text } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useRouter, Href } from "expo-router";

export default function LogoutScreen() {
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/login" as Href<"/auth/login">);
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: "70%",
    backgroundColor: "#04395E",
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
