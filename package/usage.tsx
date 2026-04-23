// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import {
//   createProjectTheme,
//   createFontConfig,
//   createThemeKit,
//   ThemeProvider,
// } from "./src";

// const projectTheme = createProjectTheme({
//   lightColors: {
//     background: "#FFFFFF",
//     surface: "#F5F5F5",
//     primary: "#0A0A0A",
//     accent: "#FF4D00",
//     text: "#111111",
//     textMuted: "#888888",
//     border: "#E0E0E0",
//     error: "#E53935",
//     success: "#43A047",
//   },
//   darkColors: {
//     background: "#0A0A0A",
//     surface: "#1A1A1A",
//     primary: "#FFFFFF",
//     accent: "#FF6B35",
//     text: "#F5F5F5",
//     textMuted: "#666666",
//     border: "#2A2A2A",
//     error: "#EF5350",
//     success: "#66BB6A",
//   },
// });

// const fontConfig = createFontConfig({
//   families: {
//     Inter: {
//       variants: {
//         Regular: "Inter-Regular",
//         Medium: "Inter-Medium",
//         SemiBold: "Inter-SemiBold",
//         Bold: "Inter-Bold",
//       },
//     },
//     Playfair: {
//       variants: {
//         Regular: "PlayfairDisplay-Regular",
//         Bold: "PlayfairDisplay-Bold",
//         Italic: { name: "PlayfairDisplay-Italic", style: "italic" },
//       },
//     },
//   },
//   sizes: {
//     xs: 11,
//     sm: 13,
//     md: 16,
//     lg: 20,
//     xl: 24,
//     xxl: 32,
//     display: 48,
//   },
// });

// const { useTheme: useAppTheme, createStyles, createDynamicStyles } = createThemeKit(projectTheme);

// const useCardStyles = createStyles((theme) => ({
//   container: {
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.radius.lg,
//     padding: theme.spacing.lg,
//     ...theme.shadows.base.md,
//   },
//   title: {
//     color: theme.colors.text,
//     ...fontConfig.InterBoldMd,
//     marginBottom: theme.spacing.sm,
//   },
//   subtitle: {
//     color: theme.colors.textMuted,
//     ...fontConfig.InterRegularSm,
//   },
//   accentDot: {
//     width: 8,
//     height: 8,
//     borderRadius: theme.radius.full,
//     backgroundColor: theme.colors.accent,
//   },
//   button: {
//     marginTop: theme.spacing.lg,
//     paddingVertical: theme.spacing.sm,
//     paddingHorizontal: theme.spacing.md,
//     backgroundColor: theme.colors.accent,
//     borderRadius: theme.radius.md,
//   },
//   buttonLabel: {
//     color: "#fff",
//     ...fontConfig.InterSemiBoldMd,
//   },
// }));

// const useDynamicTextStyles = createDynamicStyles(
//   (theme, size: number) => ({
//     bold: { color: theme.colors.text, ...fontConfig._InterBold(size) },
//     accentBold: { color: theme.colors.accent, ...fontConfig._InterBold(size) },
//   })
// );

// function DemoCard(): React.ReactElement {
//   const { theme, toggleTheme } = useAppTheme();
//   const cardStyles = useCardStyles();
//   const dynamicTextStyles = useDynamicTextStyles(18);

//   return (
//     <View
//       style={{
//         backgroundColor: theme.colors.background,
//         flex: 1,
//         padding: theme.responsive({ xs: 16, md: 24, lg: 32 }),
//       }}
//     >
//       <View style={cardStyles.container}>
//         <View style={cardStyles.accentDot} />
//         <Text style={cardStyles.title}>Design System SDK</Text>
//         <Text style={cardStyles.subtitle}>
//           {theme.mode} | {theme.layout.breakpoint} | RTL:{" "}
//           {String(theme.accessibility.isRTL)}
//         </Text>
//         <Text style={dynamicTextStyles.bold}>Dynamic 18px Bold</Text>
//         <Text style={dynamicTextStyles.accentBold}>
//           Accent: {theme.colors.accent}
//         </Text>
//       </View>

//       <TouchableOpacity style={cardStyles.button} onPress={toggleTheme}>
//         <Text style={cardStyles.buttonLabel}>Toggle Theme</Text>
//       </TouchableOpacity>

//       <View style={{ marginTop: theme.spacing.xl }}>
//         <Text style={{ ...fontConfig.PlayfairBoldXxl, color: theme.colors.text }}>
//           Playfair Bold 32
//         </Text>
//         <Text style={{ ...fontConfig.PlayfairItalicLg, color: theme.colors.textMuted }}>
//           Playfair Italic 20
//         </Text>
//         <Text style={{ ...fontConfig._PlayfairBold(56), color: theme.colors.accent }}>
//           Dynamic Playfair Bold 56
//         </Text>
//         <Text
//           style={{
//             ...fontConfig.InterMediumSm,
//             color: theme.colors.text,
//             writingDirection: theme.accessibility.dir(),
//           }}
//         >
//           Inter Medium RTL-aware
//         </Text>
//       </View>
//     </View>
//   );
// }

// export function App(): React.ReactElement {
//   return (
//     <ThemeProvider projectTheme={projectTheme} followSystem>
//       <DemoCard />
//     </ThemeProvider>
//   );
// }

// export { projectTheme, fontConfig };
