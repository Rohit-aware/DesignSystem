import React, { useCallback, useState } from "react";
import { Platform, ScrollView, useWindowDimensions, View } from "react-native";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useProductDetails, useVariantSelection } from "./hooks/useProductDetails";
import { ImageCarousel } from "./components/ImageCarousel";
import { ProductInfo } from "./components/ProductInfo";
import { SizeSelector } from "./components/SizeSelector";
import { ColorSelector } from "./components/ColorSelector";
import { ProductDescription } from "./components/ProductDescription";
import { BottomCTA } from "./components/BottomCTA";
import { useCartStore } from "../../store/cart/useCartStore";
import type { Product } from "../Home/hooks/useHomeData";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, createStyles } from "@/theme";

const IsIos = Platform.OS == 'ios'
type RouteParams = {
  ProductDetails: { product: Product };
};


export function ProductDetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, "ProductDetails">>();
  const { product } = route.params;
  const { theme } = useTheme();
  const styles = useScreenStyles();
  const { width } = useWindowDimensions();
  const [sizeError, setSizeError] = useState(false);

  const details = useProductDetails(product);
  const {
    selectedSize,
    selectedColor,
    descriptionExpanded,
    setSelectedSize,
    setSelectedColor,
    toggleDescription,
  } = useVariantSelection();

  const addToCart = useCartStore((s) => s.addToCart);

  const imageHeight = theme.responsive({ xs: 300, md: 360, lg: 420 });

  const handleAddToCart = useCallback(() => {
    if (selectedSize === null) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  }, [selectedSize, addToCart, product]);

  const handleBuyNow = useCallback(() => {
    if (selectedSize === null) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
  }, [selectedSize]);

  const handleSizeSelect = useCallback(
    (size: string) => {
      setSelectedSize(size);
      setSizeError(false);
    },
    [setSelectedSize]
  );

  return (
    <SafeAreaView style={styles.sheetContent} edges={IsIos ? ['top', 'bottom'] : ['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageCarousel
          images={details.images}
          height={imageHeight}
          width={width}
        />
        <ProductInfo
          brand={details.brand}
          title={details.title}
          price={details.price}
          originalPrice={details.originalPrice}
          discount={details.discount}
          rating={details.rating}
          reviews={details.reviews}
        />
        <View style={styles.divider} />
        <SizeSelector
          sizes={details.sizes}
          selected={selectedSize}
          onSelect={handleSizeSelect}
          showError={sizeError}
        />
        <ColorSelector
          colors={details.colors}
          selected={selectedColor}
          onSelect={setSelectedColor}
        />
        <ProductDescription
          description={details.description}
          expanded={descriptionExpanded}
          onToggle={toggleDescription}
        />
      </ScrollView>
      <BottomCTA onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
    </SafeAreaView>
  );
}

const useScreenStyles = createStyles((theme) => ({
  sheetContent: {
    backgroundColor: theme.colors.surface,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
}));
