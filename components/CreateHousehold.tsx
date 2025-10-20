import { userAtom } from "@/atoms/auth-atoms";
import { db } from "@/lib/firebase";
import { generateUniqueJoinCode } from "@/lib/generateInviteCode";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateHouseholdSubmit = async () => {
    setIsLoading(true);
    const code = await generateUniqueJoinCode();

    try {
      const ref = await addDoc(collection(db, "households"), {
        name: { householdName },
        code: code,
        application: [],
        members: [],
        chores: [],
      });
    } catch (error) {
      console.error("Error creating household:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Skapa hushåll</Text>
          <Text variant="labelMedium">Hushållsnamn</Text>
          <TextInput
            label={"namn"}
            onChangeText={setHouseholdName}
            mode="outlined"
          />
          <Button
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
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
