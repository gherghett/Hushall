import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import React, { useState } from "react";
import CreateHouseholdPopup from "@/components/CreateHouseholdPopup";
import JoinHouseholdPopup from "@/components/JoinHouseholdPopup";

export default function NoHousehold() {
  const theme = useTheme() as AppTheme;
  const [createPopupVisible, setCreatePopupVisible] = useState(false);
  const [joinPopupVisible, setJoinPopupVisible] = useState(false);

  return (
    <View
      style={[
        theme.styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Surface style={{ padding: 20, borderRadius: 12, margin: 20 }}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Dags att ha full koll på tvätten!
        </Text>
        <Button mode="outlined" onPress={() => setCreatePopupVisible(true)}>
          Skapa nytt hushåll
        </Button>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 16,
            fontSize: 16,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          eller
        </Text>
        <Button mode="outlined" onPress={() => setJoinPopupVisible(true)}>
          Gå med i någon annans hushåll
        </Button>
      </Surface>

      <CreateHouseholdPopup
        visible={createPopupVisible}
        onDismiss={() => setCreatePopupVisible(false)}
      />
      <JoinHouseholdPopup
        visible={joinPopupVisible}
        onDismiss={() => setJoinPopupVisible(false)}
      />
    </View>
  );
}
