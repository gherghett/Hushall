import { isDarkAtom } from "@/atoms/theme-atoms";
// import { AppTheme } from "@/lib/theme";
import { useAtomValue } from "jotai";
// import { useTheme } from "react-native-paper";

export type Character = {
  id: number;
  emoji: string;
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
  };
};

export const useCharacters = (): Character[] => {
  // const theme = useTheme() as AppTheme;
  const isDark = useAtomValue(isDarkAtom);
  if (isDark) {
    return [
      {
        id: 0,
        emoji: "🦊",
        colors: {
          primary: "#FF6B35",
          onPrimary: "#FFFFFF",
          secondary: "#CC5429",
        },
      },
      {
        id: 1,
        emoji: "🐬",
        colors: {
          primary: "#1976D2",
          onPrimary: "#FFFFFF",
          secondary: "#1565C0",
        },
      },
      {
        id: 2,
        emoji: "🐙",
        colors: {
          primary: "#ba2525ff",
          onPrimary: "#FFFFFF",
          secondary: "#b85858ff",
        },
      },
      {
        id: 3,
        emoji: "🐥",
        colors: {
          primary: "#F57F17",
          onPrimary: "#FFFFFF",
          secondary: "#E65100",
        },
      },
      {
        id: 4,
        emoji: "🐸",
        colors: {
          primary: "#388E3C",
          onPrimary: "#FFFFFF",
          secondary: "#2E7D32",
        },
      },
      {
        id: 5,
        emoji: "🐷",
        colors: {
          primary: "#EC407A",
          onPrimary: "#FFFFFF",
          secondary: "#C2185B",
        },
      },
      {
        id: 6,
        emoji: "🐨",
        colors: {
          primary: "#5D4037",
          onPrimary: "#FFFFFF",
          secondary: "#3E2723",
        },
      },
      {
        id: 6,
        emoji: "🦉",
        colors: {
          primary: "#795548",
          onPrimary: "#FFFFFF",
          secondary: "#BCAAA4",
        },
      },
      {
        id: 7,
        emoji: "🦄",
        colors: {
          primary: "#b40bbcff",
          onPrimary: "#FFFFFF",
          secondary: "#b167b5ff",
        },
      }
    ];
  } else {
    return [
      {
        id: 0,
        emoji: "🦊",
        colors: {
          primary: "#FF5722",
          onPrimary: "#FFFFFF",
          secondary: "#FFAB91",
        },
      },
      {
        id: 1,
        emoji: "🐬",
        colors: {
          primary: "#2196F3",
          onPrimary: "#FFFFFF",
          secondary: "#90CAF9",
        },
      },
      {
        id: 2,
        emoji: "🐙",
        colors: {
          primary: "#ba2525ff",
          onPrimary: "#FFFFFF",
          secondary: "#b85858ff",
        },
      },
      {
        id: 3,
        emoji: "🐥",
        colors: {
          primary: "#FFC107",
          onPrimary: "#FFFFFF",
          secondary: "#FFE082",
        },
      },
      {
        id: 4,
        emoji: "🐸",
        colors: {
          primary: "#4CAF50",
          onPrimary: "#FFFFFF",
          secondary: "#A5D6A7",
        },
      },
      {
        id: 5,
        emoji: "🐷",
        colors: {
          primary: "#E91E63",
          onPrimary: "#FFFFFF",
          secondary: "#F8BBD9",
        },
      },
      {
        id: 6,
        emoji: "🦉",
        colors: {
          primary: "#795548",
          onPrimary: "#FFFFFF",
          secondary: "#BCAAA4",
        },
      },
      {
        id: 7,
        emoji: "🦄",
        colors: {
          primary: "#b40bbcff",
          onPrimary: "#FFFFFF",
          secondary: "#b167b5ff",
        },
      },
    ];
  }
};
