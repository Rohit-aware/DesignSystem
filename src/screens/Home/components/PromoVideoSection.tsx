import React, { memo, useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';
import { createStyles } from '@/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

type PromoVideoSectionProps = {
  /** Remote or local video URI */
  videoUrl: string;
  /** Controlled from parent FlatList viewability — true when ≥70% visible */
  isVisible: boolean;
  /** Aspect ratio width:height (default 16:9) */
  aspectRatio?: number;
  /** Whether video starts muted (default true for autoplay compliance) */
  muted?: boolean;
  /** Optional corner radius for the video container */
  borderRadius?: number;
};


/**
 * PromoVideoSection
 *
 * A memoized, performance-optimized video player designed for FlatList usage.
 *
 * Key optimizations:
 * - `useRef` for playback state to avoid re-renders on scroll
 * - Video instance is never recreated — only paused/resumed via ref
 * - AppState listener pauses on background, resumes only if still visible
 * - `React.memo` with stable props prevents unnecessary reconciliation
 */
const PromoVideoSection = memo(
  function PromoVideoSection({
    videoUrl,
    isVisible,
    aspectRatio = 16 / 9,
    muted = true,
    borderRadius = 0,
  }: PromoVideoSectionProps) {
    const styles = useStyles();
    const videoRef = useRef<VideoRef>(null);

    const isVisibleRef = useRef(isVisible);
    const isAppActiveRef = useRef(true);

    useEffect(() => {
      isVisibleRef.current = isVisible;
    }, [isVisible]);


    const updatePlayback = useCallback(() => {
      const shouldPlay = isVisibleRef.current && isAppActiveRef.current;

      if (shouldPlay) {
        videoRef.current?.resume();
      } else {
        videoRef.current?.pause();
      }
    }, []);


    useEffect(() => {
      updatePlayback();
    }, [isVisible, updatePlayback]);


    useEffect(() => {
      const handleAppStateChange = (nextState: AppStateStatus) => {
        isAppActiveRef.current = nextState === 'active';
        updatePlayback();
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);
      return () => subscription.remove();
    }, [updatePlayback]);


    return (
      <View
        style={[
          styles.container,
          {
            // Dynamic aspect ratio via paddingBottom trick for consistent layout
            aspectRatio,
            borderRadius,
            overflow: 'hidden',
          },
        ]}
      >
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          // Start paused — playback is driven by visibility + AppState
          paused={!isVisible}
          muted={muted}
          repeat
          resizeMode="cover"
          // Performance: disable unused features
          controls={false}
          playInBackground={false}
          playWhenInactive={false}
        />
      </View>
    );
  });

export { PromoVideoSection };
export type { PromoVideoSectionProps };


const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    alignSelf: 'center',
    borderRadius: theme.spacing.md
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing.md
  },
}));
