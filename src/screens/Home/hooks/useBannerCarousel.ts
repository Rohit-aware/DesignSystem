import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import type { FlatList } from "react-native";
import { useTheme } from "@rohit-dev/design-system";

export function useBannerCarousel(count: number, intervalMs = 4000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const reduceMotion = theme.accessibility.reduceMotion;
  const flatListRef = useRef<FlatList | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(0);

  const scrollTo = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    flatListRef.current?.scrollToOffset({ offset: index * width, animated: !reduceMotion });
  }, [reduceMotion, width]);

  const next = useCallback(() => {
    const nextIdx = (activeIndexRef.current + 1) % count;
    activeIndexRef.current = nextIdx;
    setActiveIndex(nextIdx);
    flatListRef.current?.scrollToOffset({ offset: nextIdx * width, animated: !reduceMotion });
  }, [count, reduceMotion, width]);

  useEffect(() => {
    if (reduceMotion || count <= 1) return;
    timerRef.current = setInterval(next, intervalMs);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, count, intervalMs, reduceMotion]);

  return { activeIndex, flatListRef, scrollTo, screenWidth: width };
}
