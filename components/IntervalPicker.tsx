import { AppTheme } from "@/lib/theme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

interface IntervalPickerProps {
  // Add your props here, for example:
  selectedInterval?: number;
  onIntervalChange: (interval: number) => void;
}

export default function IntervalPicker({
  selectedInterval,
  onIntervalChange,
}: IntervalPickerProps) {
  const [isPicking, setIsPicking] = useState(false);
  const theme = useTheme() as AppTheme;

  console.log("pick", isPicking);

  const intervalOptions = Array.from({ length: 31 }, (_, i) => i + 1).map(n => (
    <Button
      style={styles.intervalNumberButton}
      key={n}
      onPress={() => {
        onIntervalChange(n);
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
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>
              Återkommer:
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                var{" "}
              </Text>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text
                  style={[styles.circleText, { color: theme.colors.onPrimary }]}
                >
                  {selectedInterval}
                </Text>
              </View>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                {" "}
                dag
              </Text>
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
    fontWeight: "bold",
    fontSize: 14,
  },
});
