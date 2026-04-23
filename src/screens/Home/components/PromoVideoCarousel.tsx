import { createStyles } from '@/theme';
import { PromoVideoSection } from './PromoVideoSection';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, View, } from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.78;
const SNAP_INTERVAL = ITEM_WIDTH;
const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;


export type VideoItem = {
  id: string;
  url: string;
};

type PromoVideoCarouselProps = {
  /** Array of video items to display */
  videos: VideoItem[];
  /** Whether this carousel section is visible in the parent FlatList */
  isVisible: boolean;
  /** Aspect ratio for each video card (default 16:9) */
  aspectRatio?: number;
};


/**
 * PromoVideoCarousel — "Peek-a-boo" / Partial-Preview Carousel
 *
 * Layout:
 * ┌──────────────────────────────────────────┐
 * │  [prev]    ╔════════════╗    [next]      │
 * │  small     ║   CENTER   ║    small       │
 * │  dimmed    ║   PLAYING  ║    dimmed      │
 * │            ╚════════════╝                │
 * └──────────────────────────────────────────┘
 *
 * - Center item: scale(1), opacity(1), video PLAYING
 * - Side items: scale(0.85), opacity(0.5), video PAUSED
 * - Snap-to-item for crisp alignment
 * - Animated pagination dots
 */
const PromoVideoCarousel = memo(function PromoVideoCarousel({
  videos,
  isVisible,
  aspectRatio = 16 / 9,
}: PromoVideoCarouselProps) {
  const styles = useStyles();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);


  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true },
  );

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / SNAP_INTERVAL);
      setActiveIndex(Math.max(0, Math.min(idx, videos.length - 1)));
    },
    [videos.length],
  );


  const renderItem = useCallback(
    ({ item, index }: { item: VideoItem; index: number }) => {
      const inputRange = [
        (index - 1) * SNAP_INTERVAL,
        index * SNAP_INTERVAL,
        (index + 1) * SNAP_INTERVAL,
      ];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.85, 1, 0.85],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[
            styles.card,
            {
              width: ITEM_WIDTH,
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <PromoVideoSection
            videoUrl={item.url}
            isVisible={isVisible && index === activeIndex}
            aspectRatio={aspectRatio}
            muted
            borderRadius={16}
          />
        </Animated.View>
      );
    },
    [isVisible, activeIndex, scrollX, aspectRatio, styles.card],
  );

  const keyExtractor = useCallback((item: VideoItem) => item.id, []);

  if (videos.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        initialNumToRender={2}
        windowSize={3}
      />

      {videos.length > 1 && (
        <View style={styles.pagination}>
          {videos.map((v, i) => {
            const dotInput = [
              (i - 1) * SNAP_INTERVAL,
              i * SNAP_INTERVAL,
              (i + 1) * SNAP_INTERVAL,
            ];

            const dotScale = scrollX.interpolate({
              inputRange: dotInput,
              outputRange: [1, 1.4, 1],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange: dotInput,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={v.id}
                style={[
                  styles.dot,
                  {
                    transform: [{ scale: dotScale }],
                    opacity: dotOpacity,
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
});

export { PromoVideoCarousel };
export type { PromoVideoCarouselProps };


const useStyles = createStyles((theme) => ({
  container: {
    marginVertical: theme.spacing.md,
  },
  card: {
    ...theme.shadows.base.md
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  dot: {
    width: theme.spacing.sm,
    height: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
}));
