import { isDarkAtom } from "@/atoms/theme-atoms";
// import { AppTheme } from "@/lib/theme";
import { useAtomValue } from "jotai";
// import { useTheme } from "react-native-paper";

export const useCharacters = () => {
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
        emoji: "🐋",
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
          primary: "#6A1B9A",
          onPrimary: "#FFFFFF",
          secondary: "#4A148C",
        },
      },
      {
        id: 3,
        emoji: "🐣",
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
        id: 7,
        emoji: "🦁",
        colors: {
          primary: "#FF8F00",
          onPrimary: "#FFFFFF",
          secondary: "#E65100",
        },
      },
      {
        id: 8,
        emoji: "🐺",
        colors: {
          primary: "#424242",
          onPrimary: "#FFFFFF",
          secondary: "#212121",
        },
      },
      {
        id: 9,
        emoji: "🐰",
        colors: {
          primary: "#00ACC1",
          onPrimary: "#FFFFFF",
          secondary: "#00838F",
        },
      },
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
        emoji: "🐋",
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
          primary: "#7B1FA2",
          onPrimary: "#FFFFFF",
          secondary: "#BA68C8",
        },
      },
      {
        id: 3,
        emoji: "🐣",
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
        emoji: "🐨",
        colors: {
          primary: "#795548",
          onPrimary: "#FFFFFF",
          secondary: "#BCAAA4",
        },
      },
      {
        id: 7,
        emoji: "🦁",
        colors: {
          primary: "#FF9800",
          onPrimary: "#FFFFFF",
          secondary: "#FFCC02",
        },
      },
      {
        id: 8,
        emoji: "🐺",
        colors: {
          primary: "#607D8B",
          onPrimary: "#FFFFFF",
          secondary: "#B0BEC5",
        },
      },
      {
        id: 9,
        emoji: "🐰",
        colors: {
          primary: "#00BCD4",
          onPrimary: "#FFFFFF",
          secondary: "#80DEEA",
        },
      },
    ];
  }
};
