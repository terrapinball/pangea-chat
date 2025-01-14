import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useRouter, Href } from "expo-router";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      router.push("/auth/login" as Href<"/auth/login">);
    } catch (error) {
      console.log("Signup error:", error);
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <View style={styles.container} >
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Pressable onPress={handleSignup}>
        <Text style={styles.button}>Sign Up</Text>
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
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#04395E",
    borderRadius: 20,
    textAlign: "center",
    padding: 10,
    marginTop: 20
  },
});
