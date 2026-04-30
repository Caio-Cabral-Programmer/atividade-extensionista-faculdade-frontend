export const theme = {
  colors: {
    primary: "#1B2A4A",
    secondary: "#2E5EA8",
    accent: "#C8A951",
    background: "#F5F7FA",
    surface: "#FFFFFF",
    text: "#1A1A2E",
    textMuted: "#6B7280",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  radii: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 4px rgba(0,0,0,0.05)",
    md: "0 2px 12px rgba(0,0,0,0.08)",
    lg: "0 4px 24px rgba(0,0,0,0.12)",
  },
  transitions: {
    default: "all 0.2s ease",
  },
} as const;

export type AppTheme = typeof theme;
