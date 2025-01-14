import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RoomCard = ({
  title,
  capacity,
  onPress,
}: {
  title: string;
  capacity: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.capacity}>{/* {currentUsers}/ */}{capacity}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 200,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  capacity: {
    fontSize: 16,
    color: "gray",
    marginTop: 7,
    marginLeft: 5
  },
});

export default RoomCard;
