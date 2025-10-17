import { inHoushold } from "@/atoms/auth-atoms";
import { ThemeProvider } from "@/context/theme-provider";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useAtom } from "jotai";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
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
        options={{ headerRight: () => (
            <Button onPress={() => router.navigate("/Protected/Settings")}>
              <Ionicons name="settings-outline" size={24} color="#737373ff" />
            </Button>
        )}}/>
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