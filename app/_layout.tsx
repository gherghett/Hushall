import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingScreen } from "../components/LoadingScreen";
import { ThemeProvider } from "../context/theme-provider";
import { useAuth } from "../hooks/useAuth";

function StackLayout() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  // Show loading while auth state is being determined
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
     screenOptions={{
        headerBackVisible: false
    }}>
      {/* Auth screen - only available when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="auth"
          options={{
            title: "Sign In",
            headerShown: false,
          }}
        />
      </Stack.Protected>

      {/* Protected screens - only available when authenticated */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="index"
          options={{
            title: "Hushåll",
            headerShown: false,
          }}
        />
      </Stack.Protected>
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
