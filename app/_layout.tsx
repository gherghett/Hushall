import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingScreen } from "../components/LoadingScreen";
import { SettingsButton } from "../components/SettingsButton";
import { ThemeProvider } from "../context/theme-provider";
import { useAuth } from "../hooks/useAuth";
import { AppTheme } from "../lib/theme";

// Custom header title component with dropdown indicator
function HouseholdTitle({ title = "Hushåll" }: { title?: string }) {
  const [visible, setVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(title);
  // Temporary workaround for react-native-paper Menu bug
  // Issue: https://github.com/callstack/react-native-paper/issues/4807
  // Menu can only be opened once without this key prop forcing remount
  const [menuKey, setMenuKey] = useState(0);
  const theme = useTheme() as AppTheme;

  const households = [
    "Hushåll",
    "Familjen Andersson",
    "Studentlägenheten",
    "Sommarstugan",
  ];

  const openMenu = () => {
    console.log("open");
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
    setMenuKey(k => k + 1);
    console.log("clolse");
  };

  return (
    <Menu
      key={menuKey} // Workaround: Force remount to fix Menu bug
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
          onPress={openMenu}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: theme.colors.onSurface,
              marginRight: 4,
            }}
          >
            {selectedHousehold}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
      }
    >
      {households.map(household => (
        <Menu.Item
          key={household}
          onPress={() => {
            setSelectedHousehold(household);
            closeMenu();
          }}
          title={household}
        />
      ))}
    </Menu>
  );
}

function StackLayout() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  // Show loading while auth state is being determined
  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
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
          name="(app)/(tabs)"
          options={{
            headerTitle: () => <HouseholdTitle />,
            headerTitleAlign: "center",
            headerShown: true,
            headerRight: () => <SettingsButton />,
          }}
        />
        <Stack.Screen
          name="(app)/settings"
          options={{
            title: "Inställningar",
            headerShown: true,
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
