export type ForwardedProps<T> = Omit<
  T extends HTMLDialogElement
    ? React.JSX.IntrinsicElements['dialog']
    : T extends HTMLInputElement
      ? React.JSX.IntrinsicElements['input']
      : React.HTMLProps<T>,
  'as' | 'ref' | 'style'
> &
  React.RefAttributes<T>;

// https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
const defaultProps = {
  children: true as const,
  dataSet: true as const,
  dir: true as const,
  id: true as const,
  ref: true as const,
  suppressHydrationWarning: true as const,
  tabIndex: true as const,
  testID: true as const,
};

const accessibilityProps: Record<keyof React.AriaAttributes | 'role', true> = {
  'aria-activedescendant': true,
  'aria-atomic': true,
  'aria-autocomplete': true,
  'aria-braillelabel': true,
  'aria-brailleroledescription': true,
  'aria-busy': true,
  'aria-checked': true,
  'aria-colcount': true,
  'aria-colindex': true,
  'aria-colindextext': true,
  'aria-colspan': true,
  'aria-controls': true,
  'aria-current': true,
  'aria-describedby': true,
  'aria-description': true,
  'aria-details': true,
  'aria-disabled': true,
  'aria-dropeffect': true,
  'aria-errormessage': true,
  'aria-expanded': true,
  'aria-flowto': true,
  'aria-grabbed': true,
  'aria-haspopup': true,
  'aria-hidden': true,
  'aria-invalid': true,
  'aria-keyshortcuts': true,
  'aria-label': true,
  'aria-labelledby': true,
  'aria-level': true,
  'aria-live': true,
  'aria-modal': true,
  'aria-multiline': true,
  'aria-multiselectable': true,
  'aria-orientation': true,
  'aria-owns': true,
  'aria-placeholder': true,
  'aria-posinset': true,
  'aria-pressed': true,
  'aria-readonly': true,
  'aria-relevant': true,
  'aria-required': true,
  'aria-roledescription': true,
  'aria-rowcount': true,
  'aria-rowindex': true,
  'aria-rowindextext': true,
  'aria-rowspan': true,
  'aria-selected': true,
  'aria-setsize': true,
  'aria-sort': true,
  'aria-valuemax': true,
  'aria-valuemin': true,
  'aria-valuenow': true,
  'aria-valuetext': true,
  role: true,
};

const clickProps = {
  onAuxClick: true as const,
  onAuxClickCapture: true as const,
  onClick: true as const,
  onClickCapture: true as const,
  onContextMenu: true as const,
  onContextMenuCapture: true as const,
  onGotPointerCapture: true as const,
  onGotPointerCaptureCapture: true as const,
  onLostPointerCapture: true as const,
  onLostPointerCaptureCapture: true as const,
  onPointerCancel: true as const,
  onPointerCancelCapture: true as const,
  onPointerDown: true as const,
  onPointerDownCapture: true as const,
  onPointerEnter: true as const,
  onPointerEnterCapture: true as const,
  onPointerLeave: true as const,
  onPointerLeaveCapture: true as const,
  onPointerMove: true as const,
  onPointerMoveCapture: true as const,
  onPointerOut: true as const,
  onPointerOutCapture: true as const,
  onPointerOver: true as const,
  onPointerOverCapture: true as const,
  onPointerUp: true as const,
  onPointerUpCapture: true as const,
};

const focusProps = {
  onBlur: true as const,
  onBlurCapture: true as const,
  onFocus: true as const,
  onFocusCapture: true as const,
};

const keyboardProps = {
  onKeyDown: true as const,
  onKeyDownCapture: true as const,
  onKeyUp: true as const,
  onKeyUpCapture: true as const,
};

const mouseProps = {
  onMouseDown: true as const,
  onMouseDownCapture: true as const,
  onMouseEnter: true as const,
  onMouseEnterCapture: true as const,
  onMouseLeave: true as const,
  onMouseLeaveCapture: true as const,
  onMouseMove: true as const,
  onMouseMoveCapture: true as const,
  onMouseOut: true as const,
  onMouseOutCapture: true as const,
  onMouseOver: true as const,
  onMouseOverCapture: true as const,
  onMouseUp: true as const,
  onMouseUpCapture: true as const,
};

const touchProps = {
  onTouchCancel: true as const,
  onTouchCancelCapture: true as const,
  onTouchEnd: true as const,
  onTouchEndCapture: true as const,
  onTouchMove: true as const,
  onTouchMoveCapture: true as const,
  onTouchStart: true as const,
  onTouchStartCapture: true as const,
};

const styleProps = {
  style: true as const,
  sx: true as const,
};

export const forwardedProps = {
  defaultProps,
  accessibilityProps,
  clickProps,
  focusProps,
  keyboardProps,
  mouseProps,
  touchProps,
  styleProps,
};
