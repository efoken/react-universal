import type { StyleProp, SxProps } from '@react-universal/core';
import type {
  BlurEvent,
  FocusEvent,
  NativeSyntheticEvent,
  TextInputProps as RNTextInputProps,
  ViewProps as RNViewProps,
} from 'react-native';
import type { TextStyle } from '../Text';
import type { ViewMethods, ViewProps } from '../View';

export interface TextInputMethods extends ViewMethods {
  clear(): void;
  isFocused(): boolean;
  setSelection(start: number, end: number): void;
}

export interface TextInputContentSizeChangeEvent {
  nativeEvent: {
    contentSize: {
      height: number;
      width: number;
    };
  };
}

export interface TextInputSelectionChangeEvent
  extends NativeSyntheticEvent<{
    selection: {
      start: number;
      end: number;
    };
    target: any;
    text: string;
  }> {}

export interface TextInputProps
  extends Omit<
      RNTextInputProps,
      | keyof RNViewProps
      | 'blurOnSubmit'
      | 'editable'
      | 'keyboardType'
      | 'numberOfLines'
      | 'onBlur'
      | 'onContentSizeChange'
      | 'onFocus'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onSelectionChange'
      | 'returnKeyType'
      | 'style'
    >,
    Omit<ViewProps, 'as' | 'href' | 'hrefAttrs' | 'onBlur' | 'onFocus'> {
  dir?: 'ltr' | 'rtl' | 'auto';
  onBlur?: (event: BlurEvent) => void;
  onContentSizeChange?: (event: TextInputContentSizeChangeEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onSelectionChange?: (event: TextInputSelectionChangeEvent) => void;
  rows?: number;
  style?: StyleProp<TextStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type TextInputOwnerState = Pick<TextInputProps, 'caretHidden' | 'placeholderTextColor'>;
