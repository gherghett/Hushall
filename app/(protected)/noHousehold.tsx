import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

export default function NoHousehold() {
  const theme = useTheme() as AppTheme;

  return (
    <View
      style={[
        theme.styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Surface style={[theme.styles.surfaceCard]}>
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
        <Text
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 16,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          För att komma igång behöver du gå med i ett hushåll eller skapa ett
          nytt.
        </Text>
        <Button mode="contained" onPress={() => router.push("/newHousehold")}>
          Kom igång
        </Button>
      </Surface>
    </View>
  );
}
