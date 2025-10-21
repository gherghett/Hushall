import ChoreView from "@/components/ChoreView";
import HouseholdHeader from "@/components/HouseholdHeader";
import StatisticsView from "@/components/StatisticsView";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HouseholdHeader />
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={[styles.page, { backgroundColor: "#903939ff" }]}>
          <ChoreView />
        </View>
        <View key="2" style={[styles.page, { backgroundColor: "#87CEEB" }]}>
          <StatisticsView DateRange={getCurentWeekRange()} />
        </View>
        <View key="3" style={[styles.page, { backgroundColor: "#90EE90" }]}>
          <StatisticsView DateRange={getLastWeekRange()} />
        </View>
        <View key="4" style={[styles.page, { backgroundColor: "#FFD700" }]}>
          <StatisticsView DateRange={getLastMonthRange()} />
        </View>
      </PagerView>
    </View>
  );
}

function getCurentWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay() - 1; // Sunday = 0
  const end = new Date(now);
  end.setDate(now.getDate());
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek);
  return { start, end };
}

function getLastWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay() - 1; // Sunday = 0
  const end = new Date(now);
  end.setDate(now.getDate() - dayOfWeek - 1);
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  return { start, end };
}

function getLastMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  return { start, end };
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
