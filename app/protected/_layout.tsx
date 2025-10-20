import { useHasHousehold } from "@/atoms/household-atoms";
import { ThemeProvider } from "@/context/theme-provider";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StackLayout() {
  const hasHousehold = useHasHousehold();

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
      }}
    >
      <Stack.Protected guard={hasHousehold}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!hasHousehold}>
        <Stack.Screen name="noHousehold" />
      </Stack.Protected>

      <Stack.Screen name="Settings" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StackLayout />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  pagerView: { flex: 1 },
  page: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
