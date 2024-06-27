import type { ResponderConfig } from '@tamagui/react-native-use-responder-events/types/ResponderSystem';
import type { StyleProp, SxProps } from '@universal-ui/core';
import type {
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
      | 'editable'
      | 'keyboardType'
      | 'numberOfLines'
      | 'onContentSizeChange'
      | 'onSelectionChange'
      | 'returnKeyType'
      | 'style'
    >,
    ViewProps,
    Partial<
      Pick<
        ResponderConfig,
        | 'onScrollShouldSetResponder'
        | 'onScrollShouldSetResponderCapture'
        | 'onSelectionChangeShouldSetResponder'
        | 'onSelectionChangeShouldSetResponderCapture'
      >
    > {
  dir?: 'ltr' | 'rtl' | 'auto';
  onContentSizeChange?: (event: TextInputContentSizeChangeEvent) => void;
  onSelectionChange?: (event: TextInputSelectionChangeEvent) => void;
  rows?: number;
  style?: StyleProp<TextStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type TextInputType = React.FC<TextInputProps & React.RefAttributes<TextInputMethods>> &
  TextInputMethods;

export type TextInputOwnerState = Pick<TextInputProps, 'caretHidden' | 'placeholderTextColor'>;
