export const theme = {
  colors: {
    // Main backgrounds

    background: "#0B1020",
    surface: "#12192B",
    card: "#18233A",
    inputBackground: "#10182A",

    // Borders

    border: "#243047",
    divider: "#1E293B",

    // Main brand colors

    primary: "#D7FF3F",
    primaryPressed: "#BDE62D",
    primarySoft: "rgba(215, 255, 63, 0.12)",

    // Supporting colors

    secondary: "#8B5CF6",
    secondarySoft: "rgba(139, 92, 246, 0.14)",
    accent: "#22D3EE",
    accentSoft: "rgba(34, 211, 238, 0.12)",

    // Status colors

    success: "#35D39A",
    warning: "#FFC857",
    danger: "#FF6B81",
    info: "#38BDF8",

    // Text

    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    muted: "#94A3B8",
    disabled: "#64748B",
    placeholder: "#718096",

    // Other
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
    overlay: "rgba(3, 7, 18, 0.72)",
    shadow: "rgba(0, 0, 0, 0.35)",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
    round: 999,
  },

  fontSize: {
    caption: 12,
    small: 14,
    body: 16,
    subtitle: 18,
    title: 24,
    heading: 30,
    display: 38,
  },
} as const;

export type theme = typeof theme;

export const ICON_PALETTE = [
  theme.colors.secondary,
  theme.colors.accent,
  theme.colors.success,
  theme.colors.warning,
  theme.colors.danger,
  theme.colors.info,
];
