import {
  useCurrentHousehold,
  useHasHousehold,
  useIsOwnerOfCurrentHousehold,
} from "@/atoms/household-atoms";
import { ThemeProvider } from "@/context/theme-provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StackLayout() {
  const hasHousehold = useHasHousehold();
  const currentHousehold = useCurrentHousehold();
  const isOwner = useIsOwnerOfCurrentHousehold();

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
      }}
    >
      <Stack.Protected guard={hasHousehold}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={isOwner}>
          <Stack.Screen
            name="createChore"
            options={{
              headerShown: true,
              headerBackVisible: true,
              title: `Syssla i ${currentHousehold?.name}`,
            }}
          />
        </Stack.Protected>
      </Stack.Protected>

      <Stack.Protected guard={!hasHousehold}>
        <Stack.Screen name="noHousehold" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen
        name="createHousehold"
        options={{
          headerShown: true,
          title: "Skapa nytt hushåll",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen name="settings" />
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
// const styles = StyleSheet.create({
//   pagerView: { flex: 1 },
//   page: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
// });
