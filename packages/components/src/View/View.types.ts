import type { ResponderConfig } from '@tamagui/react-native-use-responder-events/types/ResponderSystem';
import type { LayoutEvent, SxProps } from '@universal-ui/core';
import type {
  NativeMethods,
  Role as RNRole,
  ViewProps as RNViewProps,
} from 'react-native';

export interface ViewMethods extends NativeMethods {}

export interface ViewProps
  extends Omit<
      RNViewProps,
      | 'accessibilityActions'
      | 'accessibilityElementsHidden'
      | 'accessibilityLabel'
      | 'accessibilityLabelledBy'
      | 'accessibilityLiveRegion'
      | 'accessibilityRole'
      | 'accessibilityState'
      | 'accessibilityValue'
      | 'accessibilityViewIsModal'
      | 'focusable'
      | 'importantForAccessibility'
      | 'onLayout'
      | 'pointerEvents'
      | 'role'
    >,
    Pick<
      ResponderConfig,
      | 'onScrollShouldSetResponder'
      | 'onScrollShouldSetResponderCapture'
      | 'onSelectionChangeShouldSetResponder'
      | 'onSelectionChangeShouldSetResponderCapture'
    > {
  as?: React.ElementType;
  dir?: 'ltr' | 'rtl' | 'auto';
  href?: string;
  hrefAttrs?: {
    download?: any;
    rel?: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  lang?: string;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  role?: 'listbox' | 'paragraph' | RNRole;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ViewOwnerState = Pick<ViewProps, 'role'> & {
  hasTextAncestor: boolean;
};
