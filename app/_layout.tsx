import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingScreen } from "../components/LoadingScreen";
import { ThemeProvider } from "../context/theme-provider";
import { useAuth } from "../hooks/useAuth";

// Create a client
const queryClient = new QueryClient();

function StackLayout() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  // Show loading while auth state is being determined
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerShown: false,
      }}
    >
      {/* Auth screen - only available when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="index"
          options={{
            title: "Sign In",
            headerShown: false,
          }}
        />
      </Stack.Protected>

      {/* Protected screens - only available when authenticated */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="protected" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StackLayout />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
