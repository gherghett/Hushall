# React Native Unified Theming Guide

This guide shows you how to create a unified theming solution for React Native projects that combines React Navigation and React Native Paper themes with custom properties, allowing you to use `const theme = useTheme() as AppTheme;` throughout your app.

## 📋 Prerequisites

This solution works with:
- React Native projects (Expo or bare React Native)
- React Navigation for routing
- React Native Paper for UI components

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install react-native-paper jotai deepmerge
npm install @react-native-async-storage/async-storage
npm install --save-dev @types/deepmerge
```

### 2. Create Type Definitions

Create `lib/theme.ts`:

```typescript
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import deepmerge from "deepmerge";
import { TextStyle, ViewStyle } from 'react-native';
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
    // Add more custom styles as needed
  };
}

// Create a custom theme type that combines Navigation, Paper, and custom properties
export type AppTheme = NavigationTheme & MD3Theme & CustomThemeProperties;
```

### 3. Create Theme Configuration

Continue in `lib/theme.ts`:

```typescript

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
    background: "rgb(255, 251, 255)",
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
const customThemeProperties = {
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
  },
};

// Final app themes
export const appThemeLight: CombinedTheme = deepmerge(
  deepmerge(combinedDefaultTheme, customLightColors),
  customThemeProperties
);

export const appThemeDark: CombinedTheme = deepmerge(
  deepmerge(combinedDarkTheme, customDarkColors),
  customThemeProperties
);
```

### 4. Create Jotai Atoms

Create `atoms/storage.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
} as const;

// Custom async storage atom factory with full TypeScript support
export const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const baseAtom = atom<T>(initialValue)
  baseAtom.onMount = (setValue) => {
    ;(async () => {
      const item = await AsyncStorage.getItem(key)
      if (item !== null) {
        setValue(JSON.parse(item))
      }
    })()
  }
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T | ((prev: T) => T)) => {
      const nextValue =
        typeof update === 'function' ? (update as (prev: T) => T)(get(baseAtom)) : update
      set(baseAtom, nextValue)
      AsyncStorage.setItem(key, JSON.stringify(nextValue))
    },
  )
  return derivedAtom
}
```

Create `atoms/theme-atoms.ts`:

```typescript
import { atom } from 'jotai';
import { appThemeDark, appThemeLight } from '../lib/theme';
import { atomWithAsyncStorage, STORAGE_KEYS } from './storage';

export type ThemeMode = "auto" | "light" | "dark";

// Base atom for theme mode - persisted to AsyncStorage
export const themeModeAtom = atomWithAsyncStorage<ThemeMode>(
  STORAGE_KEYS.THEME_MODE, 
  "auto"
);

// Atom for system color scheme (updated by ThemeProvider)
export const systemSchemeAtom = atom<"light" | "dark" | null | undefined>("light");

// Derived atom that calculates if dark mode should be active
export const isDarkAtom = atom((get) => {
  const themeMode = get(themeModeAtom);
  const systemScheme = get(systemSchemeAtom);
  
  return themeMode === "auto" 
    ? systemScheme === "dark" 
    : themeMode === "dark";
});

// Derived atom that returns the current theme object
export const currentThemeAtom = atom((get) => {
  const isDark = get(isDarkAtom);
  return isDark ? appThemeDark : appThemeLight;
});
```

### 5. Create Theme Provider

We need a provider to provide the two theme providers, this will also update the jotai systemScheme atom to be up to date with the system settings

Create `context/theme-provider.tsx`:

```typescript
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useAtomValue, useSetAtom } from 'jotai';
import { ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { currentThemeAtom, systemSchemeAtom } from '../atoms/theme-atoms';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAtomValue(currentThemeAtom);
  const setSystemScheme = useSetAtom(systemSchemeAtom);
  const systemScheme = useColorScheme();

  // Sync system color scheme with Jotai atom
  useEffect(() => {
    setSystemScheme(systemScheme);
  }, [systemScheme, setSystemScheme]); // setSystemScheme is stable from useSetAtom

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={theme}>
        {children}
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
```

### 6. Wrap Your App

In your root layout (e.g., `app/_layout.tsx` for Expo Router or `App.tsx`):

```typescript
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/theme-provider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## 🎨 Using the Theme

### Basic Usage

```typescript
import { useTheme } from 'react-native-paper';
import { AppTheme } from '../lib/theme';

export default function MyComponent() {
  const theme = useTheme() as AppTheme;

  return (
    <View style={[theme.styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.onBackground }}>Hello World!</Text>
    </View>
  );
}
```

### Theme Toggle Component

Create `components/ThemeToggle.tsx`:

```typescript
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
        Theme: {themeMode === "auto" ? `Auto (${isDark ? "Dark" : "Light"})` : themeMode}
      </Text>
      <SegmentedButtons
        value={themeMode}
        onValueChange={(value) => setThemeMode(value as ThemeMode)}
        buttons={buttons}
      />
    </View>
  );
}
```

## 🛠 Customization

### Adding Custom Colors

In your `lib/theme.ts`, extend the colors:

```typescript
const customLightColors = {
  colors: {
    // Standard Material Design 3 colors
    primary: "rgb(120, 69, 172)",
    secondary: "rgb(102, 90, 111)",
    // ... other MD3 colors
    
    // Your custom colors
    success: "rgb(76, 175, 80)",
    warning: "rgb(255, 152, 0)",
    info: "rgb(33, 150, 243)",
  },
};
```

Don't forget to update your type definitions in `lib/theme.ts`:

```typescript
export type AppTheme = MD3Theme & {
  colors: MD3Theme['colors'] & {
    success: string;
    warning: string;
    info: string;
  };
  styles: {
    container: ViewStyle;
    title: ViewStyle;
  };
};
```

This is so that you can cast the theme you get from the hook useTheme and type safely get your custom fields

**Type Assertion**: Always use `as AppTheme` when calling `useTheme()` and update the type when adding stuff
**Provider Order**: Make sure `PaperProvider` wraps `NavigationThemeProvider`
**Deep Merge**: Use `deepmerge` to properly combine theme objects

- [React Native Paper Theming](https://callstack.github.io/react-native-paper/docs/guides/theming)
- [React Navigation Theming](https://reactnavigation.org/docs/themes)
- [Material Design 3 Colors](https://m3.material.io/styles/color/overview)