import React from 'react'
import BottomStack from './BottomStack';
import { StatusBar } from 'react-native'
import { MainStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetailsScreen } from '../screens/ProductDetails';


const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
    return (
        <>
            <StatusBar animated barStyle={"dark-content"} />
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="BottomTab" component={BottomStack} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}
                        options={{
                            presentation: 'formSheet',
                            sheetAllowedDetents: [0.6, 1],
                            sheetCornerRadius: 10,
                            sheetGrabberVisible: true,
                            keyboardHandlingEnabled: true,
                            sheetExpandsWhenScrolledToEdge: true,
                            sheetResizeAnimationEnabled: true,
                            sheetLargestUndimmedDetentIndex: 0,
                            fullScreenGestureEnabled: false,
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default MainStack