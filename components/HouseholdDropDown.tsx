import {
  selectedHouseholdAtom,
  useCurrentHousehold,
  useHouseholdsList,
} from "@/atoms/household-atoms";
import { AppTheme } from "@/lib/theme";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon, Text, useTheme } from "react-native-paper";

export default function HouseholdDropDown() {
  const currentHousehold = useCurrentHousehold();
  const households = useHouseholdsList();
  const setSelectedHousehold = useSetAtom(selectedHouseholdAtom);
  const [open, setOpen] = useState(false);
  const theme = useTheme() as AppTheme;

  // Define callback first - cleaner approach
  const handleValueChange = (callback: any) => {
    const newValue =
      typeof callback === "function"
        ? callback(currentHousehold?.id)
        : callback;
    if (newValue && newValue !== "add") {
      setSelectedHousehold(newValue);
    }
  };

  // Generate items from households data
  const items = [
    ...households.map(h => ({ label: h.name, value: h.id })),
    { label: "+", value: "add" },
  ];

  return (
    <View style={{ width: 150, zIndex: 1000, elevation: 1000 }}>
      <DropDownPicker
        open={open}
        value={currentHousehold?.id || null}
        items={items}
        setOpen={setOpen}
        setValue={handleValueChange}
        placeholder={currentHousehold?.name || "Select Household"}
        zIndex={1000}
        style={{
          backgroundColor: "transparent",
          borderWidth: 0,
          height: 40,
          justifyContent: "center",
        }}
        textStyle={{
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          color: theme.colors.onSurface,
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
          width: "200%",
          left: "-35%",
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.surface,
          borderRadius: 8,
          marginTop: 5,
          zIndex: 1000,
          elevation: 1000, // Android fix for proper layering
          maxHeight: 200, // Limit height to enable scrolling
        }}
        ArrowDownIconComponent={() => (
          <Icon
            source="chevron-down"
            size={20}
            color={theme.colors.onSurface}
          />
        )}
        ArrowUpIconComponent={() => (
          <Icon source="chevron-up" size={20} color={theme.colors.onSurface} />
        )}
        renderListItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.value === "add") {
                router.push("/(protected)/newHousehold");
              } else {
                setSelectedHousehold(item.value!);
              }
              setOpen(false);
            }}
          >
            <View
              style={{
                backgroundColor:
                  item.value === "add"
                    ? theme.colors.primaryContainer
                    : theme.colors.surface,
                margin: 5,
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: theme.colors.outline,
                flexDirection: "row",
                justifyContent:
                  item.value === "add" ? "center" : "space-between",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              {item.value !== "add" && <View style={{ width: 16 }} />}
              <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
                {item.label}
              </Text>
              {item.value !== "add" && (
                <Icon
                  source="chevron-right"
                  size={20}
                  color={theme.colors.onSurface}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
