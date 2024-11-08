'use client';

import { styled, useOwnerState } from '@react-universal/core';
import { useComposedRefs } from '@tamagui/compose-refs';
import { forwardRef, useRef } from 'react';
import type { ViewMethods, ViewProps } from '../View';
import { View } from '../View';
import type { ScrollViewProps } from './ScrollView.types';

interface ScrollViewBaseProps
  extends ViewProps,
    Pick<
      ScrollViewProps,
      | 'onScroll'
      | 'onWheel'
      | 'scrollEnabled'
      | 'scrollEventThrottle'
      | 'showsHorizontalScrollIndicator'
      | 'showsVerticalScrollIndicator'
    > {}

type ScrollViewBaseOwnerState = Required<
  Pick<
    ScrollViewBaseProps,
    'scrollEnabled' | 'showsHorizontalScrollIndicator' | 'showsVerticalScrollIndicator'
  >
>;

function normalizeScrollEvent(event: React.UIEvent<HTMLElement>) {
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
  name: 'ScrollView',
  slot: 'Root',
})<{
  onScroll?: React.UIEventHandler<HTMLElement>;
  onWheel?: React.WheelEventHandler<HTMLElement>;
  ownerState: ScrollViewBaseOwnerState;
}>({
  variants: [
    {
      props: { scrollEnabled: true },
      style: {
        overflowX: 'hidden',
        overflowY: 'hidden',
        touchAction: 'none',
      },
    },
    {
      props: ({ showsHorizontalScrollIndicator, showsVerticalScrollIndicator }) =>
        !showsHorizontalScrollIndicator || !showsVerticalScrollIndicator,
      style: {
        scrollbarWidth: 'none',
      },
    },
  ],
});

export const ScrollViewBase = forwardRef<HTMLElement & ViewMethods, ScrollViewBaseProps>(
  (
    {
      onLayout,
      onScroll,
      onTouchMove,
      onWheel,
      scrollEnabled = false,
      scrollEventThrottle = 0,
      showsHorizontalScrollIndicator = true,
      showsVerticalScrollIndicator = true,
      ...props
    },
    ref,
  ) => {
    const scrollState = useRef({ scrolling: false, scrollLastTick: 0 });
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>();

    const hostRef = useRef<React.ElementRef<typeof View>>(null);

    const handleScrollTick = (event: React.UIEvent<HTMLElement>) => {
      scrollState.current.scrollLastTick = Date.now();
      onScroll?.(normalizeScrollEvent(event));
    };

    const handleScrollStart = (event: React.UIEvent<HTMLElement>) => {
      scrollState.current.scrolling = true;
      handleScrollTick(event);
    };

    const handleScrollEnd = (event: React.UIEvent<HTMLElement>) => {
      scrollState.current.scrolling = false;
      onScroll?.(normalizeScrollEvent(event));
    };

    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
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
          if (shouldEmitScrollEvent(scrollState.current.scrollLastTick, scrollEventThrottle)) {
            handleScrollTick(event);
          }
        } else {
          // Weren't scrolling, so we must have just started
          handleScrollStart(event);
        }
      }
    };

    const handleRef = useComposedRefs(hostRef, ref);

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
);

ScrollViewBase.displayName = 'ScrollViewBase';
