import type { ResponderEvent, StyleProp, SxProps } from '@react-universal/core';
import type { ModalProps as RNModalProps, ViewProps as RNViewProps } from 'react-native';
import type { ViewProps, ViewStyle } from '../View';

export interface ModalMethods {}

export interface ModalProps
  extends Omit<
      RNModalProps,
      | keyof RNViewProps
      | 'animated'
      | 'animationType'
      | 'onDismiss'
      | 'onRequestClose'
      | 'onShow'
      | 'transparent'
      | 'visible'
    >,
    Omit<ViewProps, 'as'> {
  backdropStyle?: StyleProp<ViewStyle>;
  /**
   * A single child content element.
   */
  children: React.ReactElement;
  hideBackdrop?: boolean;
  /**
   * Callback fired when the component requests to be closed. The `reason`
   * parameter can optionally be used to control the response to `onClose`.
   * @param event The event source of the callback.
   * @param reason Can be: `"backdropPress"`, `"escapeKeyDown"`, `"hardwareBackPress"`.
   */
  onClose?: (
    event: ResponderEvent | {},
    reason?: 'backdropPress' | 'escapeKeyDown' | 'hardwareBackPress',
  ) => void;
  open: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ModalType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ModalProps> & React.RefAttributes<HTMLDialogElement & ModalMethods>
>;

export type ModalOwnerState = Pick<ModalProps, 'backdropStyle'> &
  Required<Pick<ModalProps, 'hideBackdrop'>>;
