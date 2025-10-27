import interpolateColor from "@/lib/interpolateColor";
import { AppTheme } from "@/lib/theme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

interface WeightPickerProps {
  // Add your props here, for example:
  selectedWeight: number;
  onWeightChange: (interval: number) => void;
}

const maxWeight = 10;

const weightColor = (weight: number) =>
  interpolateColor("#ccf5ccff", "#bd0c0cff", weight / maxWeight);

export default function WeightPicker({
  selectedWeight: selectedWeight,
  onWeightChange: onWeightChange,
}: WeightPickerProps) {
  const [isPicking, setIsPicking] = useState(false);
  const theme = useTheme() as AppTheme;

  const intervalOptions = Array.from(
    { length: maxWeight },
    (_, i) => i + 1
  ).map(n => (
    <Button
      style={[styles.intervalNumberButton, { backgroundColor: weightColor(n) }]}
      textColor={"rgba(255, 255, 255, 1)"}
      key={n}
      onPress={() => {
        onWeightChange(n);
        setIsPicking(false);
      }}
    >
      {n}
    </Button>
  ));

  return (
    <View style={styles.pickerContainer}>
      {isPicking && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          {intervalOptions}
        </ScrollView>
      )}
      {!isPicking && (
        <TouchableOpacity
          onPress={() => setIsPicking(true)}
          style={[styles.touchable, styles.touchableContainer]}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.container,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Tyngd:
              </Text>
              <Text style={[{ color: theme.colors.secondary }]}>
                Hur tung är sysslan att göra?
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: weightColor(selectedWeight) },
                ]}
              >
                <Text style={[styles.circleText]}>{selectedWeight}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    minHeight: 56,
  },
  scrollView: {
    height: 56,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "center", // Center buttons vertically
  },
  intervalNumberButton: {
    marginHorizontal: 2,
    minWidth: 40,
    paddingHorizontal: 0,
  },
  touchable: {
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
  },
  touchableContainer: {
    height: 56,
    justifyContent: "center",
  },
  container: {
    paddingVertical: 0, // Remove vertical padding since we're centering with justifyContent
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 16,
  },
  circle: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
