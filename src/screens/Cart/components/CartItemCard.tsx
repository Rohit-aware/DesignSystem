import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/routes/types";

export type CartItemData = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};


type Props = {
  item: CartItemData;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export const CartItemCard = memo(
  function CartItemCard({ item, onIncrease, onDecrease, onRemove }: Props) {
    const styles = useStyles();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handleCardPress = React.useCallback(
      () => {
        navigation.navigate("ProductDetails", { product: item as any });
      }, []);

    return (
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.removeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecrease(item.id)}>
                <Text style={styles.qtyBtnTxt}>−</Text>
              </TouchableOpacity>
              <View style={styles.qtyVal}>
                <Text style={styles.qtyTxt}>{item.quantity}</Text>
              </View>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => onIncrease(item.id)}>
                <Text style={styles.qtyBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexDirection: "row" as const,
    overflow: "hidden" as const,
    ...theme.shadows.base.sm,
  },
  image: {
    width: 110,
    height: 130,
    resizeMode: "cover" as const,
    backgroundColor: theme.colors.background,
  },
  body: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: "space-between" as const,
  },
  topRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-start" as const,
    gap: theme.spacing.sm,
  },
  name: {
    flex: 1,
    color: theme.colors.text,
    lineHeight: 20,
    ...fontConfig.InterMediumSm,
  },
  removeBtn: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  removeTxt: {
    color: theme.colors.textMuted,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "700" as const,
  },
  bottomRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  price: {
    color: theme.colors.text,
    ...fontConfig.InterSemiBoldLg,
  },
  qtyRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    overflow: "hidden" as const,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: theme.colors.background,
  },
  qtyBtnTxt: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600" as const,
  },
  qtyVal: {
    width: 30,
    height: 30,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  qtyTxt: {
    color: theme.colors.text,
    ...fontConfig.InterSemiBoldSm,
  },
}));