import { userAtom } from "@/atoms/auth-atoms";
import { useCreateHouseholdMutation } from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { useAtomValue } from "jotai";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  useTheme,
} from "react-native-paper";

interface CreateHouseholdProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function CreateHousehold({
  visible,
  onDismiss,
}: CreateHouseholdProps) {
  const [householdName, setHouseholdName] = useState("");
  const user = useAtomValue(userAtom);
  const theme = useTheme() as AppTheme;

  const createHouseholdMutation = useCreateHouseholdMutation();

  const handleSubmit = () => {
    if (!user || !householdName.trim()) return;

    createHouseholdMutation.mutate({
      name: householdName,
      ownerId: user.uid,
      ownerName: user.displayName || user.email || "Unknown User",
    });
  };

  useEffect(() => {
    if (createHouseholdMutation.isSuccess) {
      setHouseholdName("");
      onDismiss();
    }
  }, [createHouseholdMutation.isSuccess]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Skapa hushåll</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Namn på hushåll"
            value={householdName}
            onChangeText={setHouseholdName}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
        </Dialog.Content>
        <Dialog.Actions
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Button onPress={onDismiss} style={{ flex: 1, marginRight: 8 }}>
            Avbryt
          </Button>
          <Button
            mode="contained"
            loading={createHouseholdMutation.isPending}
            disabled={
              createHouseholdMutation.isPending || !householdName.trim()
            }
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Skapa
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
