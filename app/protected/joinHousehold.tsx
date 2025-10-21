import { userAtom } from "@/atoms/auth-atoms";
import { useJoinHouseholdMutation } from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";

export default function JoinHouseholdScreen() {
  const [householdName, setHouseholdName] = useState("");
  const user = useAtomValue(userAtom);
  const theme = useTheme() as AppTheme;

  // Use the centralized mutation hook from atoms
  const joinHouseholdMutation = useJoinHouseholdMutation();

  const handleJoinHouseholdSubmit = () => {
    if (!user || !householdName.trim()) return;

    joinHouseholdMutation.mutate({
      code: householdName.trim().toUpperCase(),
      userId: user.uid,
      userName: user.displayName || user.email || "Unknown User",
    });
  };

  // Navigate back when mutation succeeds
  React.useEffect(() => {
    if (joinHouseholdMutation.isSuccess) {
      router.back();
    }
  }, [joinHouseholdMutation.isSuccess]);

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
          loading={joinHouseholdMutation.isPending}
          disabled={joinHouseholdMutation.isPending || !householdName.trim()}
          onPress={handleJoinHouseholdSubmit}
          style={{ marginBottom: 10 }}
        >
          Gå med hushåll
        </Button>

        <Button mode="text" onPress={() => router.back()}>
          Avbryt
        </Button>
      </Surface>
    </View>
  );
}
