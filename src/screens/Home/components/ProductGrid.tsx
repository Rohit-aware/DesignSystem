import React, { memo, useCallback } from "react";
import { FlatList, View } from "react-native";
import type { Product } from "../hooks/useHomeData";
import { ProductCard } from "./ProductCard";
import { useResponsiveGrid } from "../hooks/useResponsiveGrid";

type Props = { products: Product[] };

export const ProductGrid = memo(function ProductGrid({ products }: Props) {
  const { columns, spacing, sectionPadding } = useResponsiveGrid();

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <View style={{ flex: 1, padding: spacing / 2 }}>
      <ProductCard product={item} />
    </View>
  ), [spacing]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={columns}
      key={`grid-${columns}`}
      contentContainerStyle={{
        paddingHorizontal: sectionPadding - spacing / 2,
        paddingBottom: sectionPadding,
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
});
