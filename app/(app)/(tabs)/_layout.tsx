import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRouter, useSegments, withLayoutContext } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../../lib/theme";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const CustomTabHeader = () => {
  const theme = useTheme() as AppTheme;
  const router = useRouter();
  const segments = useSegments();

  const tabs = [
    { route: "/(app)/(tabs)/", title: "idag" },
    { route: "/(app)/(tabs)/stats", title: "Stats" },
    { route: "/(app)/(tabs)/stats2", title: "Stats 2" },
  ];

  const currentTabIndex = useMemo(() => {
    const currentSegment = segments[segments.length - 1];
    if (!currentSegment || currentSegment === "(tabs)") return 0;
    if (currentSegment === "stats") return 1;
    if (currentSegment === "stats2") return 2;
    return 0;
  }, [segments]);

  const currentTab = tabs[currentTabIndex];

  const navigateLeft = () => {
    const prevIndex =
      currentTabIndex > 0 ? currentTabIndex - 1 : tabs.length - 1;
    router.push(tabs[prevIndex].route as any);
  };

  const navigateRight = () => {
    const nextIndex =
      currentTabIndex < tabs.length - 1 ? currentTabIndex + 1 : 0;
    router.push(tabs[nextIndex].route as any);
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity onPress={navigateLeft} style={styles.arrow}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={theme.colors.onSurface}
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        {currentTab.title}
      </Text>

      <TouchableOpacity onPress={navigateRight} style={styles.arrow}>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.colors.onSurface}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function SwipeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <CustomTabHeader />
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: { display: "none" }, // Hide the tab bar
        }}
      >
        <MaterialTopTabs.Screen
          name="(tabs)/index"
          options={{
            title: "idag",
          }}
        />
        <MaterialTopTabs.Screen
          name="(tabs)/stats"
          options={{
            title: "Stats",
          }}
        />
        <MaterialTopTabs.Screen
          name="(tabs)/stats2"
          options={{
            title: "Stats 2",
          }}
        />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  arrow: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
    textAlign: "center",
  },
});
