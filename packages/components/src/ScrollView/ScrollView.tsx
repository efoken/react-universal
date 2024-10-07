'use client';

import type { LayoutEvent, ResponderEvent } from '@react-universal/core';
import { styled, useOwnerState } from '@react-universal/core';
import { isArray, noop } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { Children, cloneElement, forwardRef, useImperativeHandle, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { TextInputState } from '../TextInput/TextInputState';
import type { ViewStyle } from '../View';
import { View } from '../View';
import type {
  ScrollEvent,
  ScrollViewMethods,
  ScrollViewOwnerState,
  ScrollViewProps,
  ScrollViewType,
} from './ScrollView.types';
import { ScrollViewBase } from './ScrollViewBase';

const ScrollViewRoot = styled(ScrollViewBase, {
  name: 'ScrollView',
  slot: 'Root',
})<{ ownerState: ScrollViewOwnerState }>(({ ownerState }) => ({
  flexGrow: 1,
  flexShrink: 1,
  WebkitOverflowScrolling: 'touch',
  transform: 'translateZ(0)',
  ...(ownerState.horizontal
    ? {
        flexDirection: 'row',
        overflowX: 'auto',
        overflowY: 'hidden',
      }
    : {
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
      }),
  ...(ownerState.pagingEnabled && {
    scrollSnapType: ownerState.horizontal ? 'x mandatory' : 'y mandatory',
  }),
}));

const scrollViewRefreshControlStyle: ViewStyle = {
  flexDirection: 'inherit' as any,
  flexGrow: 1,
  flexShrink: 1,
  WebkitOverflowScrolling: 'inherit',
  overflowX: 'inherit',
  overflowY: 'inherit',
  scrollSnapType: 'inherit',
};

const ScrollViewStickyHeader = styled(View, {
  name: 'ScrollView',
  slot: 'StickyHeader',
})({
  position: 'sticky' as any,
  top: 0,
  zIndex: 10,
});

const ScrollViewContentContainer = styled(View, {
  name: 'ScrollView',
  slot: 'ContentContainer',
})<{ ownerState: ScrollViewOwnerState }>(({ ownerState }) => ({
  ...(ownerState.horizontal && {
    flexDirection: 'row',
  }),
  ...(ownerState.centerContent && {
    flexGrow: 1,
    justifyContent: 'center',
  }),
}));

const ScrollViewChild = styled(View, {
  name: 'ScrollView',
  slot: 'Child',
})({
  scrollSnapAlign: 'start',
});

export const ScrollView = forwardRef<HTMLElement & ScrollViewMethods, ScrollViewProps>(
  (
    {
      centerContent = false,
      children,
      contentContainerStyle,
      horizontal = false,
      keyboardDismissMode,
      keyboardShouldPersistTaps = 'never',
      onContentSizeChange,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onResponderGrant,
      onResponderRelease,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      pagingEnabled = false,
      refreshControl,
      scrollEventThrottle = 0,
      stickyHeaderIndices,
      style,
      ...props
    },
    ref,
  ) => {
    const scrollNodeRef = useRef<React.ElementRef<typeof View>>();
    const innerViewRef = useRef<React.ElementRef<typeof View>>(null);

    const getInnerViewNode = () => innerViewRef.current;

    const getScrollableNode = () => scrollNodeRef.current!;

    const touching = useRef(false);

    const observedScrollSinceBecomingResponder = useRef(false);

    const handleScrollShouldSetResponder = () => touching.current;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleStartShouldSetResponder = () => false;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleStartShouldSetResponderCapture = () => false;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleResponderReject = () => {
      console.warn("React Universal: ScrollView doesn't take rejection well - scrolls anyway");
    };

    const handleResponderTerminationRequest = () => !observedScrollSinceBecomingResponder.current;

    const handleTouchEnd = (event: GestureResponderEvent) => {
      touching.current = event.nativeEvent.touches.length > 0;
      onTouchEnd?.(event);
    };

    const handleResponderRelease = (event: ResponderEvent) => {
      onResponderRelease?.(event);

      // By default ScrollViews will unfocus a TextInput if another touch occurs
      // outside of it
      const currentlyFocusedTextInput = TextInputState.currentlyFocusedField();
      if (
        currentlyFocusedTextInput != null &&
        keyboardShouldPersistTaps !== 'always' &&
        event.target !== currentlyFocusedTextInput &&
        !observedScrollSinceBecomingResponder.current
      ) {
        TextInputState.blurTextInput(currentlyFocusedTextInput);
      }
    };

    const handleResponderGrant = (event: ResponderEvent) => {
      observedScrollSinceBecomingResponder.current = false;
      onResponderGrant?.(event);
    };

    const handleTouchStart = (event: GestureResponderEvent) => {
      touching.current = true;
      onTouchStart?.(event);
    };

    const handleTouchMove = (event: GestureResponderEvent) => {
      onTouchMove?.(event);
    };

    const scrollTo = ({
      animated,
      x: left = 0,
      y: top = 0,
    }: { animated?: boolean; x?: number; y?: number } = {}) => {
      // Default to true, see https://reactnative.dev/docs/scrollview#scrolltoend
      const _animated = animated !== false;
      const scrollResponderNode = scrollNodeRef.current;
      if (scrollResponderNode instanceof HTMLElement) {
        scrollResponderNode.scroll({
          behavior: _animated ? 'smooth' : 'auto',
          left,
          top,
        });
      }
    };

    const scrollToEnd = ({ animated }: { animated?: boolean } = {}) => {
      const scrollResponderNode = scrollNodeRef.current!;
      if (scrollResponderNode instanceof HTMLElement) {
        const x = horizontal ? scrollResponderNode.scrollWidth : 0;
        const y = horizontal ? 0 : scrollResponderNode.scrollHeight;
        scrollTo({ animated, x, y });
      }
    };

    const getScrollResponder = ((): ScrollViewMethods => ({
      flashScrollIndicators: noop,
      getInnerViewNode,
      getScrollableNode,
      getScrollResponder,
      scrollTo,
      scrollToEnd,
    })) as () => HTMLElement & ScrollViewMethods;

    useImperativeHandle(ref, getScrollResponder);

    const handleContentContainerLayout = (event: LayoutEvent) => {
      const { height, width } = event.nativeEvent.layout;
      onContentSizeChange?.(width, height);
    };

    const handleScroll = (event: ScrollEvent) => {
      if (process.env.NODE_ENV !== 'production' && onScroll != null && scrollEventThrottle === 0) {
        console.log(
          'React Universal: You specified `onScroll` on a `<ScrollView>` but ' +
            'not `scrollEventThrottle`. You will only receive one event. ' +
            'Using `16` you get all the events but be aware that it may ' +
            "cause frame drops, use a bigger number if you don't need as " +
            'much precision.',
        );
      }

      if (keyboardDismissMode === 'on-drag') {
        TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
      }

      observedScrollSinceBecomingResponder.current = true;
      onScroll?.(event);
    };

    const handleRef = useComposedRefs<any>(scrollNodeRef, ref);

    const hasStickyHeaderIndices = !horizontal && isArray(stickyHeaderIndices);

    const _children =
      hasStickyHeaderIndices || pagingEnabled
        ? Children.map(children, (child, i) => {
            if (child != null) {
              if (hasStickyHeaderIndices && stickyHeaderIndices.includes(i)) {
                return <ScrollViewStickyHeader>{child}</ScrollViewStickyHeader>;
              }
              if (pagingEnabled) {
                return <ScrollViewChild>{child}</ScrollViewChild>;
              }
            }
            return child;
          })
        : children;

    const ownerState = useOwnerState({
      centerContent,
      horizontal,
      pagingEnabled,
    });

    const scrollView = (
      <ScrollViewRoot
        ref={handleRef}
        ownerState={ownerState}
        scrollEventThrottle={scrollEventThrottle}
        style={style}
        onResponderGrant={handleResponderGrant}
        onResponderReject={handleResponderReject}
        onResponderRelease={handleResponderRelease}
        onResponderTerminationRequest={handleResponderTerminationRequest}
        onScroll={handleScroll}
        onScrollShouldSetResponder={handleScrollShouldSetResponder}
        onStartShouldSetResponder={handleStartShouldSetResponder}
        onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        {...props}
      >
        <ScrollViewContentContainer
          ref={innerViewRef}
          collapsable={false}
          ownerState={ownerState}
          style={contentContainerStyle}
          onLayout={handleContentContainerLayout}
        >
          {_children}
        </ScrollViewContentContainer>
      </ScrollViewRoot>
    );

    if (refreshControl) {
      return cloneElement(refreshControl, { style: scrollViewRefreshControlStyle }, scrollView);
    }

    return scrollView;
  },
) as ScrollViewType;

ScrollView.displayName = 'ScrollView';
