import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import JoinHouseholdScreen from "./joinHousehold";

export default function CreateHouseholdScreen() {
  const theme = useTheme() as AppTheme;

  return (
    <View style={theme.styles.container}>
      <CreateHouseholdScreen />
      <JoinHouseholdScreen />
    </View>
  );
}
