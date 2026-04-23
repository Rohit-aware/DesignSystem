import React, { memo, useCallback, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { createStyles } from "@/theme";


const useStyles = createStyles((theme) => ({
  dot: {
    width: 5,
    height: 5,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: theme.colors.text,
    width: 18,
  },
  dotsRow: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    paddingVertical: theme.spacing.sm,
  },
  image: {
    resizeMode: "cover" as const,
  },
}));

type Props = {
  images: string[];
  height: number;
  width: number;
};

export const ImageCarousel = memo(function ImageCarousel({ images, height, width }: Props) {
  const styles = useStyles();
  const [activeIdx, setActiveIdx] = useState(0);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <Image source={{ uri: item }} style={[styles.image, { width, height }]} />
    ),
    [width, height, styles.image]
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<string> | null | undefined, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={(e) => {
          setActiveIdx(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      />
      <View style={styles.dotsRow}>
        {images.map((img, i) => (
          <View key={img} style={[styles.dot, i === activeIdx && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
});
