import type {
  FlipOptions,
  Placement,
  ShiftOptions,
  SizeOptions,
  Strategy,
  VirtualElement,
} from '@floating-ui/react-native';
import type { PlatformMethods, SxProps } from '@react-universal/core';
import type { ViewProps } from '../View';

export type PopoverAnchor =
  | VirtualElement
  | (() => VirtualElement)
  | React.RefObject<VirtualElement | null>
  | HTMLElement
  | (() => HTMLElement)
  | React.RefObject<HTMLElement | null>
  | PlatformMethods
  | (() => PlatformMethods)
  | React.RefObject<PlatformMethods | null>
  | undefined
  | null;

export interface PopoverModifier<TName extends string, TOptions extends object> {
  enabled: boolean;
  name: TName;
  options?: TOptions;
}

export interface PopoverMethods {}

export interface PopoverProps
  extends Pick<
    ViewProps,
    'dataSet' | 'dir' | 'id' | 'lang' | 'role' | 'style' | 'tabIndex' | 'testID'
  > {
  /**
   * An element, virtual element, a function that returns either or a ref. It's
   * used to set the position of the popover.
   */
  anchor?: PopoverAnchor;
  children?: React.ReactNode;
  /** @default [] */
  modifiers?: (
    | PopoverModifier<'flip', FlipOptions>
    | PopoverModifier<'shift', ShiftOptions>
    | PopoverModifier<'size', SizeOptions>
  )[];
  /**
   * If `true`, the popover is visible.
   */
  open: boolean;
  /**
   * Determines where to place the popover relative to the anchor element.
   * @default 'bottom'
   */
  placement?: Placement;
  /**
   * The type of CSS position property to use (absolute or fixed).
   * @default 'absolute'
   */
  strategy?: Strategy;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}
