import type { ResponderEvent, StyleProp, SxProps } from '@react-universal/core';
import type { PressableProps as RNPressableProps, ViewProps as RNViewProps } from 'react-native';
import type { ViewProps, ViewStyle } from '../View';

export interface ButtonStateCallbackType {
  readonly focusVisible: boolean;
  readonly hovered: boolean;
  readonly pressed: boolean;
}

export interface ButtonProps
  extends Omit<
      RNPressableProps,
      | keyof RNViewProps
      | 'disabled'
      | 'onHoverIn'
      | 'onHoverOut'
      | 'onLongPress'
      | 'onPress'
      | 'onPressIn'
      | 'onPressMove'
      | 'onPressOut'
    >,
    Omit<ViewProps, 'children' | 'style'> {
  children?: React.ReactNode | ((state: ButtonStateCallbackType) => React.ReactNode);
  disabled?: boolean;
  onFocusVisible?: RNPressableProps['onFocus'];
  onHoverIn?: (event: React.MouseEvent<HTMLElement>) => void;
  onHoverOut?: (event: React.MouseEvent<HTMLElement>) => void;
  onLongPress?: (event: ResponderEvent) => void;
  onPress?: (event: ResponderEvent) => void;
  onPressIn?: (event: ResponderEvent) => void;
  onPressMove?: (event: ResponderEvent) => void;
  onPressOut?: (event: ResponderEvent) => void;
  style?: StyleProp<ViewStyle> | ((state: ButtonStateCallbackType) => StyleProp<ViewStyle>);
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
  type?: 'button' | 'submit' | 'reset';
}

export type ButtonOwnerState = Required<Pick<ButtonProps, 'disabled'>>;
