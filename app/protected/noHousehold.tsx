import { useHasHousehold } from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

export default function NoHousehold() {
  const hasHousehold = useHasHousehold();
  const theme = useTheme() as AppTheme;

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
        <Button
          mode="contained"
          onPress={() => router.push("./protected/createHousehold")}
        >
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
        <Button
          mode="outlined"
          onPress={() => router.push("./protected/joinHousehold")}
        >
          Gå med i någon annans hushåll
        </Button>
      </Surface>
    </View>
  );
}
