import React from 'react'
import { projectTheme } from './theme'
import MainStack from './routes/MainStack'
import { ThemeProvider } from '@rn-lab/design-system'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AppEntry = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider projectTheme={projectTheme}>
                <MainStack />
            </ThemeProvider>
        </SafeAreaProvider>
    )
}

export default AppEntry