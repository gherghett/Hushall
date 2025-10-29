import { AppTheme } from "@/lib/theme";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import CreateHousehold from "../../components/CreateHousehold";
import JoinHousehold from "../../components/JoinHousehold";
export default function NewHouseholdScreen() {
  const theme = useTheme() as AppTheme;

  return (
    <KeyboardAvoidingView
      style={theme.styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <CreateHousehold />
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
        <JoinHousehold />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
