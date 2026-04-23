import { createProjectTheme, createFontConfig, createThemeKit } from "@rohit-dev/design-system";

export const projectTheme = createProjectTheme({
    lightColors: {
        surface: "#FFFFFF",
        surfaceRaised: "#FFFFFF",
        primary: "#111111",
        accent: "#FF4D00",
        accentSoft: "#FFF0EB",
        text: "#111111",
        textMuted: "#888888",
        textInverse: "#FFFFFF",
        border: "#E5E5E5",
        error: "#E53935",
        success: "#43A047",
        card: "#FFFFFF",
        overlay: "rgba(0,0,0,0.4)",
        custom: '#01A48F'
    },
    darkColors: {
        background: "#0A0A0A",
        surface: "#141414",
        surfaceRaised: "#1E1E1E",
        primary: "#FFFFFF",
        accent: "#FF6B35",
        accentSoft: "#2A1500",
        text: "#F0F0F0",
        textMuted: "#666666",
        textInverse: "#111111",
        border: "#2A2A2A",
        error: "#EF5350",
        success: "#66BB6A",
        card: "#1A1A1A",
        overlay: "rgba(0,0,0,0.7)",
        custom: "#F8F8F8",
    },
    shadows: {
        accent: "#2A2A2A",
    },
});

export const fontConfig = createFontConfig({
    families: {
        Inter: {
            variants: {
                Regular: "Inter-Regular",
                Medium: "Inter-Medium",
                SemiBold: "Inter-SemiBold",
                Bold: "Inter-Bold",
            },
        },
        Playfair: {
            variants: {
                Regular: "PlayfairDisplay-Regular",
                Bold: "PlayfairDisplay-Bold",
                Italic: { name: "PlayfairDisplay-Italic", style: "italic" },
            },
        },
    },
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 32,
        display: 48,
    },
});

// 🔥 Bind once here
export const {
    useTheme,
    createStyles,
    createDynamicStyles,
} = createThemeKit(projectTheme);