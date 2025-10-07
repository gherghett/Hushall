import { atom } from 'jotai';
import { appThemeDark, appThemeLight } from '../lib/theme';
import { atomWithAsyncStorage, STORAGE_KEYS } from './storage';

export type ThemeMode = "auto" | "light" | "dark";


// Base atom for theme mode - kept up to date in the ThemeProvider
export const themeModeAtom = atomWithAsyncStorage<ThemeMode>(
  STORAGE_KEYS.THEME_MODE, 
  "auto"
);

// Atom for system color scheme (will be updated by components)
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