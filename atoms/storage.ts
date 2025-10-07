import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'jotai/utils';

/**
 * Shared AsyncStorage adapter for Jotai atoms
 * Use this for any atom that needs persistence across app restarts
 */
export const asyncStorage = createJSONStorage(() => AsyncStorage);

/**
 * Storage keys - centralized to avoid conflicts
 */
export const STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
  // Add more keys as needed:
  // USER_PREFERENCES: 'userPreferences',
  // APP_SETTINGS: 'appSettings',
} as const;