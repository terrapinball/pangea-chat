// components/organisms/LoginForm.tsx
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { useRouter, Href } from "expo-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/rooms/list" as Href<"/rooms/list">);
    } catch (error) {
      console.log(error);
      alert("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
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
    width: "100%",
    backgroundColor: "#04395E",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
