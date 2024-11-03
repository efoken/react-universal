export type PressAwayMouseEventHandler =
  | 'onPress'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onPointerDown'
  | 'onPointerUp';

export type PressAwayTouchEventHandler = 'onTouchStart' | 'onTouchEnd';

export interface PressAwayListenerProps {
  children: React.ReactElement<
    Record<PressAwayMouseEventHandler | PressAwayTouchEventHandler, (event: any) => void>
  > & { ref?: any };
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   * @default false
   */
  disableReactTree?: boolean;
  /**
   * The mouse event to listen to. You can disable the listener by providing
   * `false`.
   * @default 'onPress'
   */
  mouseEvent?: PressAwayMouseEventHandler | false;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onPressAway: (event: MouseEvent | TouchEvent) => void;
  /**
   * The touch event to listen to. You can disable the listener by providing
   * `false`.
   * @default 'onTouchEnd'
   */
  touchEvent?: PressAwayTouchEventHandler | false;
}
