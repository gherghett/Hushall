import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import CreateHousehold from "./createHousehold";
import JoinHousehold from "./joinHousehold";

export default function NewHouseholdScreen() {
  const theme = useTheme() as AppTheme;

  console.log("ny sida");

  return (
    <View style={theme.styles.container}>
      <CreateHousehold />
      <JoinHousehold />
      <View></View>
    </View>
  );
}
