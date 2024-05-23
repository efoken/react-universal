'use client';

import type { OverridableComponent } from '@universal-ui/core';
import { styled, useForkRef, useOwnerState } from '@universal-ui/core';
import { forwardRef, useRef } from 'react';
import type { ScrollView as RNScrollView } from 'react-native';
import { View } from '../View';
import type { ScrollViewOwnerState, ScrollViewProps } from './ScrollView.types';

function normalizeScrollEvent(event: React.UIEvent<any>) {
  return {
    nativeEvent: {
      contentOffset: {
        x: (event.target as HTMLElement).scrollLeft,
        y: (event.target as HTMLElement).scrollTop,
      },
      contentSize: {
        height: (event.target as HTMLElement).scrollHeight,
        width: (event.target as HTMLElement).scrollWidth,
      },
      layoutMeasurement: {
        height: (event.target as HTMLElement).offsetHeight,
        width: (event.target as HTMLElement).offsetWidth,
      },
    },
    timeStamp: event.timeStamp,
  };
}

function shouldEmitScrollEvent(lastTick: number, eventThrottle: number) {
  return eventThrottle > 0 && Date.now() - lastTick >= eventThrottle;
}

const ScrollViewRoot = styled(View, {
  label: 'ScrollViewRoot',
})<{
  onScroll?: React.UIEventHandler;
  onWheel?: React.WheelEventHandler;
  ownerState: ScrollViewOwnerState;
}>(
  ({ ownerState }) =>
    ownerState.scrollEnabled && {
      overflowX: 'hidden',
      overflowY: 'hidden',
      touchAction: 'none',
    },
  ({ ownerState }) =>
    ownerState.showsHorizontalScrollIndicator === false ||
    (ownerState.showsVerticalScrollIndicator === false && {
      scrollbarWidth: 'none',
    }),
);

export const ScrollView = forwardRef<any, ScrollViewProps>(
  (
    {
      onLayout,
      onScroll,
      onTouchMove,
      onWheel,
      scrollEnabled = false,
      scrollEventThrottle = 0,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      ...props
    },
    ref,
  ) => {
    const scrollState = useRef({ scrolling: false, scrollLastTick: 0 });
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>();

    const hostRef = useRef<any>(null);

    const handleScrollTick = (event: React.UIEvent) => {
      scrollState.current.scrollLastTick = Date.now();
      onScroll?.(normalizeScrollEvent(event));
    };

    const handleScrollStart = (event: React.UIEvent) => {
      scrollState.current.scrolling = true;
      handleScrollTick(event);
    };

    const handleScrollEnd = (event: React.UIEvent) => {
      scrollState.current.scrolling = false;
      onScroll?.(normalizeScrollEvent(event));
    };

    const handleScroll = (event: React.UIEvent) => {
      event.stopPropagation();
      if (event.target === hostRef.current) {
        event.persist();
        // A scroll happened, so the scroll resets the scrollend timeout.
        if (scrollTimer.current != null) {
          clearTimeout(scrollTimer.current);
        }
        scrollTimer.current = setTimeout(() => {
          handleScrollEnd(event);
        }, 100);
        if (scrollState.current.scrolling) {
          // Scroll last tick may have changed, check if we need to notify
          if (
            shouldEmitScrollEvent(
              scrollState.current.scrollLastTick,
              scrollEventThrottle,
            )
          ) {
            handleScrollTick(event);
          }
        } else {
          // Weren't scrolling, so we must have just started
          handleScrollStart(event);
        }
      }
    };

    const handleRef = useForkRef(hostRef, ref);

    const ownerState = useOwnerState({
      scrollEnabled,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
    });

    return (
      <ScrollViewRoot
        ref={handleRef}
        ownerState={ownerState}
        onScroll={handleScroll}
        onTouchMove={scrollEnabled ? onTouchMove : undefined}
        onWheel={scrollEnabled ? onWheel : undefined}
        {...props}
      />
    );
  },
) as OverridableComponent<ScrollViewProps, typeof RNScrollView>;

ScrollView.displayName = 'ScrollView';
