export interface FocusTrapProps {
  /**
   * A single child content element.
   */
  children: React.ReactElement<{
    children?: React.ReactNode;
    onFocus?: (event: any) => void;
    ref?: React.Ref<any>;
  }> & {
    ref: React.RefObject<any>;
  };
  /**
   * If `true`, the FocusTrap will not automatically shift focus to itself when
   * it opens, and replace it to the last focused element when it closes. This
   * also works correctly with any FocusTrap children that have the
   * `disableAutoFocus` prop.
   *
   * 🚨 Generally this should never be set to `true` as it makes the FocusTrap
   * less accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus?: boolean;
  disabled?: boolean;
  /**
   * If `true`, the FocusTrap will not prevent focus from leaving the FocusTrap
   * while open.
   *
   * 🚨 Generally this should never be set to `true` as it makes the FocusTrap
   * less accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, the FocusTrap will not restore focus to previously focused
   * element once FocusTrap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus?: boolean;
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the
   * root. For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable?: (root: HTMLElement) => HTMLElement[];
  /**
   * If `true`, focus is locked.
   */
  open: boolean;
}
