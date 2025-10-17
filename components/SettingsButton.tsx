import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../lib/theme";

export function SettingsButton() {
  const router = useRouter();
  const theme = useTheme() as AppTheme;

  return (
    <TouchableOpacity
      onPress={() => router.push("/(app)/settings" as any)}
      style={{ marginRight: 10 }}
    >
      <Ionicons
        name="settings-outline"
        size={24}
        color={theme.colors.onSurface}
      />
    </TouchableOpacity>
  );
}
