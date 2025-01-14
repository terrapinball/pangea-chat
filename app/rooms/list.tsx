import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import RoomCard from "@/components/organisms/RoomCard";
import CreateRoomModal from "@/components/organisms/CreateRoomModal";
import { useRouter } from "expo-router";
import { AuthContext } from "@/components/organisms/AuthProvider";

const List = () => {
  interface Room {
    id: string;
    capacity: number;
    [key: string]: any;
  }

  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { user } = authContext;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(FIREBASE_DB, "rooms");
        const roomsSnapshot = await getDocs(roomsCollection);
        const roomsList = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          capacity: doc.data().capacity,
          ...doc.data(),
        }));
        setRooms(roomsList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };

    fetchRooms();
  }, [rooms]);

  const createRoom = async (
    roomName: string,
    capacity: string,
    isAutoModerated: boolean
  ) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      setIsLoading(true);
      setModalVisible(false);

      const newRoomRef = await addDoc(collection(FIREBASE_DB, "rooms"), {
        userId: user.uid,
        roomName: roomName,
        capacity: parseInt(capacity),
        isAutoModerated: isAutoModerated,
      });

      const messagesCollection = collection(newRoomRef, "messages");
      await addDoc(messagesCollection, {
        userId: user.uid,
        text: "Welcome to the new room!",
        timestamp: serverTimestamp(),
      });


      const roomsCollection = collection(FIREBASE_DB, "rooms");
      const roomsSnapshot = await getDocs(roomsCollection);
      const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        capacity: doc.data().capacity,
        ...doc.data(),
      }));

      setRooms(roomsList);
    } catch (error) {
      console.error("Error creating room", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.roomListContainer}>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Create Room</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/auth/logout")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <RoomCard
                title={item.roomName}
                capacity={item.capacity}
                onPress={() =>
                  router.push({
                    pathname: "/rooms/[id]",
                    params: { id: item.id },
                  })
                }
              />
            )}
          </View>
        )}
      />

      <CreateRoomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreateRoom={createRoom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  roomListContainer: {
    flex: 1,
    padding: 22,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "45%",
    backgroundColor: "#04395E",
    borderRadius: 20,
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default List;
