import {
  useCurrentHousehold,
  useEditHouseholdNameMutation,
} from "@/atoms/household-atoms";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppTheme } from "@/lib/theme";
import { Button, View } from "react-native";
import { Divider, Surface, Text, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const theme = useTheme() as AppTheme;
  const household = useCurrentHousehold();
  const editNameMutation = useEditHouseholdNameMutation();

  // här ser du hur man ändrar namnet---- du behöver såklart skicka in det namnet som användaren skrivit in i textruta eller vad det kan bara
  const handleTestEditName = () => {
    if (!household) return;
    editNameMutation.mutate({
      name: "TestName" + Math.floor(Math.random() * 1000),
      id: household.id,
    });
  };

  return (
    <View style={[theme.styles.container]}>
      <Surface>
        <Text> Settings</Text>
        <Divider></Divider>
        <ThemeToggle />
        <Button title="Test Edit Household Name" onPress={handleTestEditName} />
      </Surface>
    </View>
  );
}
