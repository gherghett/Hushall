import { useMemberCompletionValue } from "@/atoms/household-atoms";
import ChoreView from "@/components/ChoreView";
import HouseholdHeader from "@/components/HouseholdHeader";
import StatisticsView from "@/components/StatisticsView";
import { AppTheme } from "@/lib/theme";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Text, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme() as AppTheme;
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Get data for each potential statistics page
  const currentWeekRange = getCurentWeekRange();
  const lastWeekRange = getLastWeekRange();
  const lastMonthRange = getLastMonthRange();

  const currentWeekData = useMemberCompletionValue(
    currentWeekRange.start,
    currentWeekRange.end
  );
  const lastWeekData = useMemberCompletionValue(
    lastWeekRange.start,
    lastWeekRange.end
  );
  const lastMonthData = useMemberCompletionValue(
    lastMonthRange.start,
    lastMonthRange.end
  );

  // Check if data exists for each range
  const hasCurrentWeekData =
    currentWeekData && Object.values(currentWeekData).some(d => d.total > 0);
  const hasLastWeekData =
    lastWeekData && Object.values(lastWeekData).some(d => d.total > 0);
  const hasLastMonthData =
    lastMonthData && Object.values(lastMonthData).some(d => d.total > 0);

  // Define available pages
  const availablePages = [
    { key: "chores", component: <ChoreView />, hasData: true },
    {
      key: "currentWeek",
      title: "Nuvarande vecka",
      component: <StatisticsView DateRange={currentWeekRange} />,
      hasData: hasCurrentWeekData,
    },
    {
      key: "lastWeek",
      title: "Förgående vecka",
      component: <StatisticsView DateRange={lastWeekRange} />,
      hasData: hasLastWeekData,
    },
    {
      key: "lastMonth",
      title: "Förgående månad",
      component: <StatisticsView DateRange={lastMonthRange} />,
      hasData: hasLastMonthData,
    },
  ].filter(page => page.hasData);

  const navigateLeft = () => {
    const newPage =
      currentPage > 0 ? currentPage - 1 : availablePages.length - 1;
    pagerRef.current?.setPage(newPage);
    setCurrentPage(newPage);
  };

  const navigateRight = () => {
    const newPage =
      currentPage < availablePages.length - 1 ? currentPage + 1 : 0;
    pagerRef.current?.setPage(newPage);
    setCurrentPage(newPage);
  };

  return (
    <View style={{ flex: 1 }}>
      <HouseholdHeader
        onNavigateLeft={navigateLeft}
        onNavigateRight={navigateRight}
        showNavigationButtons={availablePages.length > 1}
      />
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
      >
        {availablePages.map((page, index) => (
          <View
            key={page.key}
            style={index === 0 ? [theme.styles.container] : [styles.page]}
          >
            <Text variant="titleLarge" style={{ padding: 16 }} >{page.title}</Text>
            {page.component}
          </View>
        ))}
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
