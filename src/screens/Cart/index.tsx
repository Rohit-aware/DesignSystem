import React, { useCallback } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import { useCartScreen } from "./hooks/useCartScreen";
import { CartItemCard, type CartItemData } from "./components/CartItemCard";
import { CartSummary } from "./components/CartSummary";
import { EmptyCart } from "./components/EmptyCart";
import { SafeAreaView } from "react-native-safe-area-context";


export function CartScreen() {
  const { theme } = useTheme();
  const styles = useStyles();
  const { items, count, total, increaseQty, decreaseQty, removeFromCart, clearCart, onBack } = useCartScreen();

  const renderItem = useCallback(({ item }: { item: CartItemData }) => (
    <CartItemCard
      item={item}
      onIncrease={increaseQty}
      onDecrease={decreaseQty}
      onRemove={removeFromCart}
    />
  ), [increaseQty, decreaseQty, removeFromCart]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.surface}
      />
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>ITEMS IN MY BAG</Text>
          {count > 0 && <Text style={styles.headerCount}>{count} ITEM{count !== 1 ? "S" : ""}</Text>}
        </View>
        {count > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearCart} activeOpacity={0.7}>
            <Text style={styles.clearTxt}>CLEAR ALL</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <EmptyCart onShop={onBack} />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <CartSummary subtotal={total} />
        </>
      )}
    </SafeAreaView>
  );
};

const useStyles = createStyles((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  backTxt: { color: theme.colors.text, fontSize: 16 },
  headerCenter: { flex: 1 },
  headerTitle: { color: theme.colors.text, ...fontConfig.InterSemiBoldMd },
  headerCount: { color: theme.colors.textMuted, ...fontConfig.InterRegularXs },
  clearBtn: { paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs },
  clearTxt: { color: theme.colors.error, ...fontConfig.InterMediumMd },
  list: { paddingTop: theme.spacing.md },
}));
