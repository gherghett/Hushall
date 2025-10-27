import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";
import HouseholdDropDown from "./HouseholdDropDown";

export default function HouseholdHeader() {
  return (
    <View style={{ width: "100%", backgroundColor: "red", paddingTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: 24 }} />
        <HouseholdDropDown />
        <Button
          style={{}}
          onPress={() => router.navigate("/(protected)/settings")}
        >
          <Ionicons name="settings-outline" size={24} color="#737373ff" />
        </Button>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AntDesign name="caret-left" size={16} />
        <AntDesign name="caret-right" size={16} />
      </View>
    </View>
  );
}
