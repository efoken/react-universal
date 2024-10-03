import type { FlipOptions, ShiftOptions, SizeOptions } from '@floating-ui/react-native';
import { findLast, runIfFunction } from '@react-universal/utils';
import type { PopoverAnchor, PopoverModifier } from './Popover.types';

export function resolveAnchor(anchor: PopoverAnchor) {
  if (anchor != null && 'current' in anchor) {
    return anchor.current;
  }
  return runIfFunction(anchor);
}

export function parseModifiers(modifiers: PopoverModifier<string, Record<string, any>>[]) {
  return {
    flip: findLast(
      modifiers,
      (modifier): modifier is PopoverModifier<'flip', FlipOptions> => modifier.name === 'flip',
    ),
    shift: findLast(
      modifiers,
      (modifier): modifier is PopoverModifier<'shift', ShiftOptions> => modifier.name === 'shift',
    ),
    size: findLast(
      modifiers,
      (modifier): modifier is PopoverModifier<'size', SizeOptions> => modifier.name === 'size',
    ),
  };
}
