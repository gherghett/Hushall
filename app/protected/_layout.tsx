import { inHoushold } from "@/atoms/auth-atoms";
import HouseholdHeader from "@/components/HouseholdHeader";
import { ThemeProvider } from "@/context/theme-provider";
import { Stack } from "expo-router";
import { useAtom } from "jotai";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StackLayout() {
  const [inhousehold] = useAtom(inHoushold);
  
  return (
    <Stack
    screenOptions={{
        headerBackVisible: false
    }}>
      <Stack.Protected guard={inhousehold}>
        <Stack.Screen name="index"
        options={{ headerTitle: () => ( <HouseholdHeader/>),
        headerTitleAlign: 'center'
        }}/>
      </Stack.Protected>

      <Stack.Protected guard={!inhousehold}>
        <Stack.Screen name="noHousehold"/>
      </Stack.Protected>

      <Stack.Screen name="Settings"/>
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