import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { appThemeDark, appThemeLight } from '../lib/theme';
import { STORAGE_KEYS } from './storage';

export type ThemeMode = "auto" | "light" | "dark";

const atomWithAsyncStorage = (key: string, initialValue: any) => {
  const baseAtom = atom(initialValue)
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
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      AsyncStorage.setItem(key, JSON.stringify(nextValue))
    },
  )
  return derivedAtom
}

// Base atom for theme mode - kept up to date in the ThemeProvider
export const themeModeAtom = atomWithAsyncStorage(
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