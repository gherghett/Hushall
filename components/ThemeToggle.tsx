import { useAtom, useAtomValue } from 'jotai';
import { View } from "react-native";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";
import { isDarkAtom, ThemeMode, themeModeAtom } from '../atoms/theme-atoms';
import { AppTheme } from "../lib/theme";

export function ThemeToggle() {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const isDark = useAtomValue(isDarkAtom);
  const theme = useTheme() as AppTheme;

  const buttons = [
    {
      value: "auto" as const,
      label: "Auto",
      icon: "theme-light-dark",
    },
    {
      value: "light" as const,
      label: "Light",
      icon: "weather-sunny",
    },
    {
      value: "dark" as const,
      label: "Dark", 
      icon: "weather-night",
    },
  ];
  
  return (
    <View style={{ padding: 16 }}>
      <Text 
        variant="bodyMedium" 
        style={{ 
          color: theme.colors.onBackground, 
          marginBottom: 12,
          textAlign: 'center'
        }}
      >
        Theme: {themeMode === "auto" ? `Auto (${isDark ? "Dark" : "Light"})` : themeMode as string}
      </Text>
      <SegmentedButtons
        value={themeMode as ThemeMode}
        onValueChange={(value) => setThemeMode(value as ThemeMode)}
        buttons={buttons}
      />
    </View>
  );
}