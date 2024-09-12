import type { StyleProp, SxProps } from '@react-universal/core';
import type { PressableProps as RNPressableProps, ViewProps as RNViewProps } from 'react-native';
import type { ViewMethods, ViewProps, ViewStyle } from '../View';

export interface ButtonMethods extends ViewMethods {}

export interface ButtonStateCallbackType {
  readonly focusVisible: boolean;
  readonly hovered: boolean;
  readonly pressed: boolean;
}

export interface ButtonProps
  extends Omit<RNPressableProps, keyof RNViewProps | 'disabled'>,
    Omit<ViewProps, 'children' | 'style'> {
  children?: React.ReactNode | ((state: ButtonStateCallbackType) => React.ReactNode);
  disabled?: boolean;
  onFocusVisible?: RNPressableProps['onFocus'];
  style?: StyleProp<ViewStyle> | ((state: ButtonStateCallbackType) => StyleProp<ViewStyle>);
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
  type?: 'button' | 'submit' | 'reset';
}

export type ButtonType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement & ButtonMethods>
>;

export type ButtonOwnerState = Required<Pick<ButtonProps, 'disabled'>>;
