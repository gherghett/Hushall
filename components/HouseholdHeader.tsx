import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import HouseholdDropDown from "./HouseholdDropDown";
import { useTheme } from "react-native-paper";
import { AppTheme } from "@/lib/theme";

export default function HouseholdHeader() {
  const theme = useTheme() as AppTheme;
  return (
    <View style={{ width: "100%", backgroundColor: "red", paddingTop: 64 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 24 }} />
        <HouseholdDropDown />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 4, // tiny hit area padding, keeps full icon visible
          }}
          onPress={() => router.navigate("/(protected)/settings")}
        >
          <Ionicons name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AntDesign name="caret-left" size={30} />
        <AntDesign name="caret-right" size={30} />
      </View>
    </View>
  );
}
