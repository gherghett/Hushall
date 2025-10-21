import ChoreView from "@/components/ChoreView";
import HouseholdHeader from "@/components/HouseholdHeader";
import { AppTheme } from "@/lib/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme() as AppTheme;
  return (
    <View style={{ flex: 1 }}>
      <HouseholdHeader />
      <PagerView style={styles.pagerView} initialPage={0}>
        <View
          key="1"
          style={[theme.styles.container, { backgroundColor: "#903939ff" }]}
        >
          <ChoreView />
        </View>
        <View key="2" style={[styles.page, { backgroundColor: "#87CEEB" }]}>
          <Text style={styles.title}>Igår</Text>
        </View>
        <View key="3" style={[styles.page, { backgroundColor: "#90EE90" }]}>
          <Text style={styles.title}>Vecka</Text>
        </View>
        <View key="4" style={[styles.page, { backgroundColor: "#FFD700" }]}>
          <Text style={styles.title}>Månad</Text>
        </View>
        <View key="5" style={[styles.page, { backgroundColor: "#FF8C00" }]}>
          <Text style={styles.title}>2025</Text>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: { flex: 1 },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
