import type { StyleProp, SxProps } from '@react-universal/core';
import type {
  KeyboardEvent as RNKeyboardEvent,
  RefreshControlProps as RNRefreshControlProps,
  ScrollViewProps as RNScrollViewProps,
  ViewProps as RNViewProps,
} from 'react-native';
import type { ViewProps, ViewStyle } from '../View';

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

export interface ScrollViewMethods {
  flashScrollIndicators(): void;
  getInnerViewNode(): any;
  getScrollableNode(): any;
  getScrollResponder(): any;
  scrollTo(options?: { animated?: boolean; x?: number; y?: number }): void;
  scrollToEnd(options?: { animated?: boolean }): void;
}

export interface ScrollViewProps
  extends Omit<
      RNScrollViewProps,
      | keyof RNViewProps
      | 'contentContainerStyle'
      | 'keyboardShouldPersistTaps'
      | 'onScroll'
      | 'refreshControl'
    >,
    Omit<ViewProps, 'href' | 'hrefAttrs'> {
  /**
   * These styles will be applied to the ScrollView content container which
   * wraps all of the child views.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Determines when the keyboard should stay visible after a tap.
   * - `never` (the default), tapping outside of the focused text input when the
   *    keyboard is up dismisses the keyboard. When this happens, children won't
   *    receive the tap.
   * - `always`, the keyboard will not dismiss automatically, and the ScrollView
   *    will not catch taps, but children of the ScrollView can catch taps.
   * - `handled`, the keyboard will not dismiss automatically when the tap was
   *    handled by a children, (or captured by an ancestor).
   * @default 'never'
   */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  onKeyboardDidHide?: (event: RNKeyboardEvent) => void;
  onKeyboardDidShow?: (event: RNKeyboardEvent) => void;
  onKeyboardWillHide?: (event: RNKeyboardEvent) => void;
  onKeyboardWillShow?: (event: RNKeyboardEvent) => void;
  /**
   * Callback fired at most once per frame during scrolling.
   * @param event
   */
  onScroll?: (event: ScrollEvent) => void;
  onWheel?: (event: React.WheelEvent<any>) => void;
  /**
   * A RefreshControl component, used to provide pull-to-refresh functionality
   * for the ScrollView.
   */
  refreshControl?: React.ReactElement<Omit<RNRefreshControlProps, keyof RNViewProps> & ViewProps>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ScrollViewType = React.FC<
  React.PropsWithoutRef<ScrollViewProps> & React.RefAttributes<HTMLElement & ScrollViewMethods>
>;

export type ScrollViewOwnerState = Required<
  Pick<ScrollViewProps, 'centerContent' | 'horizontal' | 'pagingEnabled'>
>;
