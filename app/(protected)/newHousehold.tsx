import { AppTheme } from "@/lib/theme";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import CreateHousehold from "../../components/CreateHousehold";
import JoinHousehold from "../../components/JoinHousehold";
export default function NewHouseholdScreen() {
  const theme = useTheme() as AppTheme;

  return (
    <View style={theme.styles.container}>
      <CreateHousehold />
      <JoinHousehold />
      <View></View>
    </View>
  );
}
