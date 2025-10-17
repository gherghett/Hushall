import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { AppTheme } from "../lib/theme";

export function LoadingScreen() {
  const theme = useTheme() as AppTheme;

  return (
    <View
      style={[
        theme.styles.container,
        {
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <ActivityIndicator size="large" />
      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onBackground,
          marginTop: 16,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}
