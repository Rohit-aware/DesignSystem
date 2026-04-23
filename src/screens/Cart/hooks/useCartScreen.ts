import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore, selectCartItemCount, selectCartTotal } from "@/store/cart/useCartStore";

export function useCartScreen() {
  const navigation = useNavigation();

  const items = useCartStore(useShallow((s) => Object.values(s.items)));
  const count = useCartStore(selectCartItemCount);
  const total = useCartStore(selectCartTotal);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

  const onBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  return { items, count, total, increaseQty, decreaseQty, removeFromCart, clearCart, onBack };
}
