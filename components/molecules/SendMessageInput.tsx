import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

import { FIREBASE_DB } from "@/FirebaseConfig";
import { moderateText } from "@/services/textModeration";
import { AuthContext } from "@/components/organisms/AuthProvider";

interface Room {
  id: string;
  capacity: number;
  isAutoModerated: boolean;
  roomName: string;
}

const SendMessageInput = ({ room }: { room: Room }) => {
  const [message, setMessage] = useState("");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { user } = authContext;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      if (room.isAutoModerated) {
        const { flagged, reasons } = await moderateText(message);

        if (flagged) {
          alert(`Flagged for: ${reasons.join(", ")}`);
          return;
        }
      }
      
      await addDoc(collection(doc(FIREBASE_DB, "rooms", room.id), "messages"), {
        text: message,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={styles.input}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#04395E",
    borderRadius: 20,
    padding: 10,
  },
});

export default SendMessageInput;
