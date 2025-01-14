import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function InsideLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export const styles = StyleSheet.create({
    // button: {
    //   backgroundColor: "lightblue",
    //   borderColor: "gray",
    //   borderRadius: 8,
    //   alignItems: "center",
    //   alignSelf: "center",
    //   justifyContent: "center",
    //   height: 30,
    //   width: 110,
    //   margin: 4,
    // },
    // input: {
    //   borderColor: "gray",
    //   borderWidth: 1,
    //   borderRadius: 8,
    //   padding: 10,
    //   marginBottom: 10,
    // },
    // loginButtonsContainer: {
    //   flexDirection: "row",
    //   justifyContent: "center",
    // },
    // titleContainer: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   gap: 8,
    // },
    // stepContainer: {
    //   gap: 8,
    //   marginBottom: 8,
    // },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
  });