import { User } from "firebase/auth";
import { atom } from "jotai";

// Types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
  displayName?: string;
}

// Simple atoms - no complex actions needed!
export const authStateAtom = atom<AuthState>({
  user: null,
  isLoading: true,
  isInitialized: false,
});

// Derived atoms for convenience
export const userAtom = atom(get => get(authStateAtom).user);
export const isAuthenticatedAtom = atom(get => !!get(authStateAtom).user);
export const isLoadingAtom = atom(get => get(authStateAtom).isLoading);
export const isInitializedAtom = atom(get => get(authStateAtom).isInitialized);

