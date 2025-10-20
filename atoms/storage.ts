import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

export const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const baseAtom = atom<T>(initialValue);
  baseAtom.onMount = setValue => {
    (async () => {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item));
      }
    })();
  };
  const derivedAtom = atom(
    get => get(baseAtom),
    (get, set, update: T | ((prev: T) => T)) => {
      const nextValue =
        typeof update === "function"
          ? (update as (prev: T) => T)(get(baseAtom))
          : update;
      set(baseAtom, nextValue);
      AsyncStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

/**
 * Storage keys - centralized to avoid conflicts
 */
export const STORAGE_KEYS = {
  THEME_MODE: "themeMode",
  // Add more keys as needed when you actually need them
} as const;
