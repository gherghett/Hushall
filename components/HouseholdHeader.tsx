import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import HouseholdDropDown from "./HouseholdDropDown";

interface HouseholdHeaderProps {
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  showNavigationButtons?: boolean;
}

export default function HouseholdHeader({
  onNavigateLeft,
  onNavigateRight,
  showNavigationButtons = false,
}: HouseholdHeaderProps) {
  const theme = useTheme() as AppTheme;
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: theme.colors.surface,
        paddingTop: 64,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 24 }} />
        <HouseholdDropDown />
        <IconButton
          icon="cog"
          size={24}
          onPress={() => router.navigate("/(protected)/settings")}
          style={{ margin: 0 }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {showNavigationButtons && (
          <IconButton
            icon="chevron-left"
            size={30}
            onPress={onNavigateLeft}
            style={{ margin: 0 }}
          />
        )}
        {showNavigationButtons && (
          <IconButton
            icon="chevron-right"
            size={30}
            onPress={onNavigateRight}
            style={{ margin: 0 }}
          />
        )}
      </View>
    </View>
  );
}
