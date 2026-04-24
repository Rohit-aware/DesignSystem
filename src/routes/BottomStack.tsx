import { useTheme } from "@/theme";
import { HomeScreen } from "@/screens/Home";
import { CartScreen } from "@/screens/Cart";
import { BottomStackParamList } from "./types";
import { GrooveScreen } from "@/screens/Groove";
import { platform } from "@rn-lab/design-system";
import { TabIcon } from "./components/TabIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { selectCartItemCount, useCartStore } from "@/store/cart/useCartStore";

const Tabs = createBottomTabNavigator<BottomStackParamList>();

const BottomStack = () => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const count = useCartStore(selectCartItemCount);
    const height = platform({ android: { height: 56 + insets.bottom }, ios: { height: 49 + insets.bottom } });

    return (
        <Tabs.Navigator
            screenOptions={({ }) => ({
                headerShown: false,
                tabBarStyle: {
                    ...height,
                    paddingTop: 6,
                    backgroundColor: theme.colors.background
                },
            })}>
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            inactiveIcon="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
                            activeIcon="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            activeIcon="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
                            inactiveIcon="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                            count={count}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Groove"
                component={GrooveScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            activeIcon="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                            inactiveIcon="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}

export default BottomStack;
