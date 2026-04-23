import { createStyles, fontConfig, useTheme } from "@/theme";
import React, { useEffect, useRef, memo } from "react";
import { View, Image, Text, Animated } from "react-native";

type Props = {
    focused: boolean;
    activeIcon: string;
    inactiveIcon: string;
    count?: number;
    colorActive?: string;
    colorInactive?: string;
};

const TabIconComponent = ({
    focused,
    activeIcon,
    inactiveIcon,
    count = 0,
}: Props) => {
    const { theme } = useTheme();
    const scale = useRef(new Animated.Value(1)).current;
    const prevCount = useRef(count);
    const isFirstRender = useRef(true);
    const styles = useBottomStackStyle();

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (count !== prevCount.current && count > 0) {
            scale.setValue(1.3);

            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                friction: 5,
                tension: 140,
            }).start();
        }

        prevCount.current = count;
    }, [count]);

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: focused ? activeIcon : inactiveIcon,
                }}
                style={[
                    styles.icon,
                    { tintColor: focused ? theme.colors.text : theme.colors.text },
                ]}
                resizeMode="contain"
            />

            {count > 0 && (
                <Animated.View
                    style={[
                        styles.badge,
                        { transform: [{ scale }] },
                    ]}
                >
                    <Text style={styles.badgeText}>
                        {count > 99 ? "99+" : count}
                    </Text>
                </Animated.View>
            )}
        </View>
    );
};

export const TabIcon = memo(TabIconComponent);
const useBottomStackStyle = createStyles((t) => {
    return {
        container: {
            width: 30,
            height: 30,
        },
        icon: {
            width: 24,
            height: 24,
        },
        badge: {
            position: "absolute",
            top: -6,
            right: -10,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: t.colors.primary,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
        },
        badgeText: {
            ...fontConfig.InterSemiBoldXs,
            color: t.colors.textInverse,
        },
    }
});