// https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js
const defaultProps = {
  children: true,
  dataSet: true,
  dir: true,
  id: true,
  ref: true,
  suppressHydrationWarning: true,
  tabIndex: true,
  testID: true,
} as const;

const accessibilityProps = {
  'aria-activedescendant': true,
  'aria-atomic': true,
  'aria-autocomplete': true,
  'aria-busy': true,
  'aria-checked': true,
  'aria-colcount': true,
  'aria-colindex': true,
  'aria-colspan': true,
  'aria-controls': true,
  'aria-current': true,
  'aria-describedby': true,
  'aria-details': true,
  'aria-disabled': true,
  'aria-errormessage': true,
  'aria-expanded': true,
  'aria-flowto': true,
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
  'aria-required': true,
  'aria-roledescription': true,
  'aria-rowcount': true,
  'aria-rowindex': true,
  'aria-rowspan': true,
  'aria-selected': true,
  'aria-setsize': true,
  'aria-sort': true,
  'aria-valuemax': true,
  'aria-valuemin': true,
  'aria-valuenow': true,
  'aria-valuetext': true,
  role: true,
} as const;

const clickProps = {
  onAuxClick: true,
  onClick: true,
  onContextMenu: true,
  onGotPointerCapture: true,
  onLostPointerCapture: true,
  onPointerCancel: true,
  onPointerDown: true,
  onPointerEnter: true,
  onPointerLeave: true,
  onPointerMove: true,
  onPointerOut: true,
  onPointerOver: true,
  onPointerUp: true,
} as const;

const focusProps = {
  onBlur: true,
  onFocus: true,
} as const;

const keyboardProps = {
  onKeyDown: true,
  onKeyDownCapture: true,
  onKeyUp: true,
  onKeyUpCapture: true,
} as const;

const mouseProps = {
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseUp: true,
} as const;

const touchProps = {
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true,
} as const;

const styleProps = {
  style: true,
  sx: true,
} as const;

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
