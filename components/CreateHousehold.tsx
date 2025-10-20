import { userAtom } from "@/atoms/auth-atoms";
import { db } from "@/lib/firebase";
import { AppTheme } from "@/lib/theme";
import { addDoc, collection } from "firebase/firestore";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function CreateHoushold() {
  const theme = useTheme() as AppTheme;
  const [householdName, setHouseholdName] = useState("");
  const user = useAtomValue(userAtom);
  const [modalVisible, setModalVisible] = useState(true);

  const handleCreateHouseholdSubmit = async () => {
    try {
      const ref = await addDoc(collection(db, "households"), {
        name: { householdName },
        code: 123,
        application: [],
        members: [],
        chores: [],
      });
    } catch (error) {
      console.error("Error creating household:", error);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Skapa Hushåll</Text>
          <Text variant="labelMedium">Hushållsnamn</Text>
          <TextInput
            label={"namn"}
            onChangeText={setHouseholdName}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={() => {
              setModalVisible(!modalVisible);
              handleCreateHouseholdSubmit();
            }}
          >
            Create
          </Button>
        </Card.Content>
      </Card>
    </Modal>
  );
}
