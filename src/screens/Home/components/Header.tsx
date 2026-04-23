import React, { memo } from "react";
import { createStyles, fontConfig, useTheme } from "@/theme";
import { BottomStackParamList } from "@/routes/types";
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCartStore, selectCartItemCount } from "../../../store/cart/useCartStore";

type HeaderProps = { onSearchPress: () => void };

export const Header = memo(function Header({ onSearchPress }: HeaderProps) {
  const styles = useHeaderStyles();
  const { mode, toggleTheme } = useTheme();
  const cartCount = useCartStore(selectCartItemCount);
  const { navigate } = useNavigation<NativeStackNavigationProp<BottomStackParamList>>();

  const handleCartPress = React.useCallback(() => {
    navigate("Cart");
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SHOPIFY</Text>
      <TouchableOpacity style={styles.searchBtn} onPress={onSearchPress} activeOpacity={0.7}>
        <Text>🔍</Text>
        <Text style={styles.searchText}>Search...</Text>
      </TouchableOpacity>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme} accessibilityRole="button">
          <Text style={styles.themeToggleText}>{mode === 'dark' ? '☀' : '☾'}</Text>
        </TouchableOpacity>
        <View style={styles.cartWrap}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={handleCartPress}>
            <Text style={styles.iconText}>🛍</Text>
          </TouchableOpacity>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount > 9 ? "9+" : cartCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const useHeaderStyles = createStyles((theme) => ({
  themeToggle: {
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.text,
    paddingHorizontal: theme.spacing.xs,
  },
  themeToggleText: {
    ...fontConfig.InterSemiBoldMd,
    color: theme.colors.text,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  logo: {
    color: theme.colors.text,
    letterSpacing: 1,
    ...fontConfig.InterBoldXl,
  },
  spacer: { flex: 1 },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 20 },
  cartWrap: { position: "relative" as const },
  badge: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: theme.colors.textInverse,
    fontSize: 8,
    fontWeight: "700" as const,
    lineHeight: 10,
  },
  searchBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchText: {
    color: theme.colors.textMuted,
    ...fontConfig.InterRegularSm,
  },
}));
