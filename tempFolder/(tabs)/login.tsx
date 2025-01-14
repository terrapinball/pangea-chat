import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ParallaxScrollView from "@/tempFolder/app-example/ParallaxScrollView";
import { styles } from "./_layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      router.replace("/(inside)");
    } catch (error) {
      console.error(error);
      //   alert("Invalid email or password");
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful");
    } catch (error) {
      console.error(error);
      //   alert("Registration failed");
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      alert("Logged out successfully");
      router.replace("/(tabs)/login");
    } catch (error) {
      console.error(error);
      //   alert("Failed to logout");
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={email}
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(input) => setEmail(input)}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(input) => setPassword(input)}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.loginButtonsContainer}>
              <Pressable style={styles.button} onPress={login}>
                <Text>Login</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={register}>
                <Text>Register</Text>
              </Pressable>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </ParallaxScrollView>
  );
};

export default Login;
