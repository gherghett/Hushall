import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  authStateAtom,
  isAuthenticatedAtom,
  isLoadingAtom,
  LoginCredentials,
  RegisterCredentials,
  userAtom,
} from "../atoms/auth-atoms";
import { auth } from "../lib/firebase";

// Hook for auth state and actions
export function useAuth() {
  const authState = useAtomValue(authStateAtom);
  const setAuthState = useSetAtom(authStateAtom);
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthState({
          user,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isInitialized: true,
        });
      }
    });

    return unsubscribe;
  }, [setAuthState]);

  const signIn = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign in failed",
      };
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        return { success: false, error: "Passwords do not match" };
      }

      setAuthState(prev => ({ ...prev, isLoading: true }));

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Update display name if provided
      if (credentials.displayName) {
        await updateProfile(userCredential.user, {
          displayName: credentials.displayName,
        });
      }

      return { success: true, user: userCredential.user };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign up failed",
      };
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign out failed",
      };
    }
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    isInitialized: authState.isInitialized,

    // Actions
    signIn,
    signUp,
    signOut,
  };
}

// Convenience hook for getting just the user
export function useUser(): User | null {
  return useAtomValue(userAtom);
}

// Hook for checking if user is authenticated
export function useIsAuthenticated(): boolean {
  return useAtomValue(isAuthenticatedAtom);
}
