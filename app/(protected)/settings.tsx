import { ThemeToggle } from "@/components/ThemeToggle";
import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { Divider, Surface, Text, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;

  return (
    <View style={[theme.styles.container]}>
      <Surface>
        <Text> Settings</Text>
        <Divider></Divider>
        <ThemeToggle />
      </Surface>
    </View>
  );
}
