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