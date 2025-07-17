import type { ResponderEvent, SxProps } from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import type { ModalProps as RNModalProps, ViewProps as RNViewProps } from 'react-native';
import type { ViewProps } from '../View';

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
    event: ResponderEvent | AnyObject,
    reason?: 'backdropPress' | 'escapeKeyDown' | 'hardwareBackPress',
  ) => void;
  /**
   * If `true`, the modal is visible.
   */
  open: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ModalOwnerState = Required<Pick<ModalProps, 'hideBackdrop'>>;
