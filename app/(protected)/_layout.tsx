import {
  useCurrentHousehold,
  useHasHousehold,
  useIsOwnerOfCurrentHousehold,
} from "@/atoms/household-atoms";
import { ThemeProvider } from "@/context/theme-provider";
import { AppTheme } from "@/lib/theme";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StackLayout() {
  const hasHousehold = useHasHousehold();
  const currentHousehold = useCurrentHousehold();
  const isOwner = useIsOwnerOfCurrentHousehold();
  const theme = useTheme() as AppTheme;

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.onBackground,
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
        <Stack.Screen
          name="noHousehold"
          options={{
            headerShown: true,
            headerBackVisible: true,
            title: "Välkommen!",
          }}
        />
      </Stack.Protected>

      <Stack.Screen
        name="newHousehold"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Gå med i ett hushåll",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Inställningar",
          headerBackVisible: true,
        }}
      />
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
