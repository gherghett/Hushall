import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import React, { useState } from "react";
import CreateHousehold from "@/components/CreateHousehold";

export default function NoHousehold() {
  const theme = useTheme() as AppTheme;
  const [popupVisible, setPopupVisible] = useState(false);

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
        <Button mode="contained" onPress={() => setPopupVisible(true)}>
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
        <Button mode="outlined">Gå med i någon annans hushåll</Button>
      </Surface>

      <CreateHousehold
        visible={popupVisible}
        onDismiss={() => setPopupVisible(false)}
      />
    </View>
  );
}
