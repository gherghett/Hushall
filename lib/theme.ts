import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import deepmerge from "deepmerge";
import { TextStyle, ViewStyle } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

// Define custom properties that we want to add to the theme
export interface CustomThemeProperties {
  styles: {
    container: ViewStyle;
    title: TextStyle;
    surfaceCard: ViewStyle;
    // Add more custom styles as needed
  };
}

// Create a custom theme type that combines Navigation, Paper, and custom properties
export type AppTheme = NavigationTheme & MD3Theme & CustomThemeProperties;

// Adapt navigation themes to work with Paper
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Base combined themes
const combinedDarkTheme = deepmerge(DarkTheme, MD3DarkTheme);
const combinedDefaultTheme = deepmerge(LightTheme, MD3LightTheme);

// Custom light theme colors
const customLightColors = {
  colors: {
    primary: "rgb(120, 69, 172)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(240, 219, 255)",
    onPrimaryContainer: "rgb(44, 0, 81)",
    // Add your custom colors here
    background: "rgba(242, 242, 242, 0.95)",
    onBackground: "rgb(29, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(29, 27, 30)",
  },
} as const;

// Custom dark theme colors
const customDarkColors = {
  colors: {
    primary: "rgb(220, 184, 255)",
    onPrimary: "rgb(71, 12, 122)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    // Add your custom colors here
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
  },
} as const;

// Custom properties to extend the theme
const customThemeProperties: CustomThemeProperties = {
  styles: {
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      textAlign: "center" as const,
      marginBottom: 20,
      fontWeight: "bold" as const,
    },
    surfaceCard: {
      padding: 20,
      borderRadius: 12,
      margin: 20,
    },
  },
};

// Final app themes
export const appThemeLight: AppTheme = deepmerge(
  deepmerge(combinedDefaultTheme, customLightColors),
  customThemeProperties
);

export const appThemeDark: AppTheme = deepmerge(
  deepmerge(combinedDarkTheme, customDarkColors),
  customThemeProperties
);
