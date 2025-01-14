import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const CreateRoomModal = ({
  visible,
  onClose,
  onCreateRoom,
}: {
  visible: boolean;
  onClose: () => void;
  onCreateRoom: (
    roomName: string,
    capacity: string,
    isAutoModerated: boolean
  ) => void;
}) => {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isAutoModerated, setIsAutoModerated] = useState(false);

  const handleCreate = () => {
    onCreateRoom(roomName, capacity, isAutoModerated);
    setRoomName("");
    setCapacity("");
    setIsAutoModerated(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Room</Text>

          <TextInput
            style={styles.input}
            placeholder="Room Name"
            value={roomName}
            onChangeText={setRoomName}
          />

          <TextInput
            style={styles.input}
            placeholder="Capacity"
            value={capacity}
            onChangeText={setCapacity}
            keyboardType="numeric"
          />

          <View style={styles.switchRow}>
            <Text>Auto Moderation</Text>
            <Switch
              value={isAutoModerated}
              onValueChange={setIsAutoModerated}
            />
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.modalButton} onPress={handleCreate}>
              <Text>Create</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={onClose}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },
  switchRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    width: "45%",
  },
});

export default CreateRoomModal;
