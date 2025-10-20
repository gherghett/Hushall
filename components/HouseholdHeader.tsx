import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";
import HouseholdDropDown from "./HouseholdDropDown";

export default function HouseholdHeader() {
    return(
 
      <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"  }}>
        <View style={{width: 24}}/>
        <HouseholdDropDown/>
        <Button style={{}} onPress={() => router.navigate("/protected/Settings")}>
          <Ionicons name="settings-outline" size={24} color="#737373ff"  />
        </Button>
      </View>

    )
}