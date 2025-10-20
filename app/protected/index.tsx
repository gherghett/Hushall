import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Index() {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={[styles.page, { backgroundColor: "#903939ff" }] }>
        <Text style={styles.title}> Syslor</Text>
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
  );
}

const styles = StyleSheet.create({
  pagerView: { flex: 1 },
  page: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
});
