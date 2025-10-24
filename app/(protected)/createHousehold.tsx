import { userAtom } from "@/atoms/auth-atoms";
import { useCreateHouseholdMutation } from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";

export default function CreateHouseholdScreen() {
  const [householdName, setHouseholdName] = useState("");
  const user = useAtomValue(userAtom);
  const theme = useTheme() as AppTheme;

  // Use the centralized mutation hook from atoms
  const createHouseholdMutation = useCreateHouseholdMutation();

  const handleCreateHouseholdSubmit = () => {
    if (!user || !householdName.trim()) return;

    createHouseholdMutation.mutate({
      name: householdName,
      ownerId: user.uid,
      ownerName: user.displayName || user.email || "Unknown User",
    });
  };

  // Navigate back when mutation succeeds
  React.useEffect(() => {
    if (createHouseholdMutation.isSuccess) {
      router.back();
    }
  }, [createHouseholdMutation.isSuccess]);

  return (
    <View style={theme.styles.container}>
      <Surface style={{ padding: 20 }}>
        <Text variant="labelMedium" style={{ marginBottom: 8 }}>
          Hushållsnamn
        </Text>

        <TextInput
          label="Namn på hushåll"
          value={householdName}
          onChangeText={setHouseholdName}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="contained"
          loading={createHouseholdMutation.isPending}
          disabled={createHouseholdMutation.isPending || !householdName.trim()}
          onPress={handleCreateHouseholdSubmit}
          style={{ marginBottom: 10 }}
        >
          Skapa hushåll
        </Button>

        <Button mode="text" onPress={() => router.back()}>
          Avbryt
        </Button>
      </Surface>
    </View>
  );
}
