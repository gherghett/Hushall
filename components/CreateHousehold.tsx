import { userAtom } from "@/atoms/auth-atoms";
import { db } from "@/lib/firebase";
import { AppTheme } from "@/lib/theme";
import { addDoc, collection } from "firebase/firestore";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";

export default function CreateHoushold() {
  const theme = useTheme() as AppTheme;
  const [householdName, setHouseholdName] = useState("");
  const user = useAtomValue(userAtom);

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
    <Card>
      <Card.Content>
        <Text variant="titleLarge">Skapa Hushåll</Text>
        <Text variant="labelMedium">Hushållsnamn</Text>
        <TextInput
          label={"namn"}
          onChangeText={setHouseholdName}
          mode="outlined"
        />
        <Button mode="contained" onPress={handleCreateHouseholdSubmit}>
          Create
        </Button>
      </Card.Content>
    </Card>
  );
}
