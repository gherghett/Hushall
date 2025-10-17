import { ThemeProvider } from "@/context/theme-provider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

function StackLayout() {

  return (
    <Stack
    screenOptions={{
        headerBackVisible: false
    }}>
      
      <Stack.Screen 
      name="index"
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
