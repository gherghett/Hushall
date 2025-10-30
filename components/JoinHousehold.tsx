import { userAtom } from "@/atoms/auth-atoms";
import { useJoinHouseholdMutation } from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";

export default function JoinHouseholdScreen() {
  const [householdCode, setHouseholdCode] = useState("");
  const user = useAtomValue(userAtom);
  const theme = useTheme() as AppTheme;

  // Use the centralized mutation hook from atoms
  const joinHouseholdMutation = useJoinHouseholdMutation();

  const handleJoinHouseholdSubmit = () => {
    if (!user || !householdCode) return;

    joinHouseholdMutation.mutate({
      code: householdCode,
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
    <Surface style={theme.styles.surfaceCard}>
      <Text variant="labelMedium" style={{ marginBottom: 8 }}>
        Använd kod för att gå med i hushåll
      </Text>

      <TextInput
        label="Kod"
        value={householdCode}
        onChangeText={text => setHouseholdCode(text)}
        mode="outlined"
        style={{ marginBottom: 20 }}
      />

      <Button
        mode="contained"
        loading={joinHouseholdMutation.isPending}
        disabled={joinHouseholdMutation.isPending || !householdCode.trim()}
        onPress={handleJoinHouseholdSubmit}
        style={{ marginBottom: 10 }}
      >
        Gå med hushåll
      </Button>

      {/* <Button mode="text" onPress={() => router.back()}>
        Avbryt
      </Button> */}
    </Surface>
  );
}
