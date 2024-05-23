import type { SxProps } from '@universal-ui/core';
import type { ScrollViewProps as RNScrollViewProps } from 'react-native';

export interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      x: number;
      y: number;
    };
    contentSize: {
      height: number;
      width: number;
    };
    layoutMeasurement: {
      height: number;
      width: number;
    };
  };
  timeStamp: number;
}

export interface ScrollViewProps extends Omit<RNScrollViewProps, 'onScroll'> {
  onScroll?: (event: ScrollEvent) => void;
  onWheel?: (event: React.WheelEvent) => void;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ScrollViewOwnerState = Required<
  Pick<ScrollViewProps, 'scrollEnabled'>
> &
  Pick<
    ScrollViewProps,
    'showsHorizontalScrollIndicator' | 'showsVerticalScrollIndicator'
  >;
