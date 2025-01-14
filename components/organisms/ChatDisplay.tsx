import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import SendMessageInput from "../molecules/SendMessageInput";

interface Message {
  id: string;
  text: string;
  timestamp: { seconds: number; nanoseconds: number };
}

interface Room {
  id: string;
  capacity: number;
  isAutoModerated: boolean;
  roomName: string;
}

const ChatDisplay = ({
  messages,
  room,
}: {
  messages: Message[];
  room: Room;
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const convertTimestamp = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    const messageDate = new Date(timestamp?.seconds * 1000);
    const currentDate = new Date();

    const timeDifferenceInHours =
      (currentDate.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    const formattedTime = messageDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    if (timeDifferenceInHours <= 12) {
      return formattedTime;
    }

    const formattedDate = messageDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, keyboardHeight]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text>{message.text}</Text>
            <Text style={styles.timestamp}>
              {convertTimestamp(message.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.sendMessageInputContainer}>
        <SendMessageInput room={room} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    margin: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  messagesContainer: {
    flex: 1,
  },
  sendMessageInputContainer: {
    marginBottom: 30,
  },
});

export default ChatDisplay;
