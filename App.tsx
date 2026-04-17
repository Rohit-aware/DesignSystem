/**
 * App.tsx
 * WHAT A JUNIOR LEARNS:
 *   - activateFonts() called BEFORE render — sets font config globally
 *   - ProjectThemeProvider wraps everything — brand colors + followSystem
 *   - StyleShowcaseScreen is the full learning reference
 */
import React from 'react';
import { StyleShowcaseScreen } from './src/screens/StyleShowcase';
import { buildProjectTheme } from './src/theme/projectTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@ds';


export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider buildTheme={buildProjectTheme}>
        <StyleShowcaseScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
