import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/FirebaseConfig";
import ChatDisplay from "@/components/organisms/ChatDisplay";

const ChatRoom = () => {
  interface Message {
    id: string;
    userId: string;
    text: string;
    timestamp: { seconds: number; nanoseconds: number };
  }

  interface Room {
    id: string;
    capacity: number;
    isAutoModerated: boolean;
    roomName: string;
  }

  const route = useRoute();
  const { id } = route.params as { id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const roomDocRef = doc(FIREBASE_DB, "rooms", id);

    const fetchRoomData = async () => {
      const roomDoc = await getDoc(roomDocRef);
      if (roomDoc.exists()) {
        setRoom({
          id: roomDoc.id,
          capacity: roomDoc.data().capacity,
          isAutoModerated: roomDoc.data().isAutoModerated,
          roomName: roomDoc.data().roomName,
        });
      }
    }

    const messagesCollection = collection(
      doc(FIREBASE_DB, "rooms", id),
      "messages"
    );
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messagesList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
          .filter((message) => message.timestamp && message.timestamp.seconds);
        setMessages(messagesList);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching messages", error);
      }
    );

    fetchRoomData();

    return () => unsubscribe();
  }, [id]);

  if (isLoading || !room) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <ChatDisplay messages={messages} room={room} />;
};

export default ChatRoom;