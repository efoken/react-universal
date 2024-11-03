import type { Breakpoints } from './breakpoints';

export { UnistylesRuntime as StyleRuntime } from 'react-native-unistyles';

export interface StyleMiniRuntime {
  breakpoints: Breakpoints;
  fontScale: number;
  insets: {
    bottom: string | number;
    left: string | number;
    right: string | number;
    top: string | number;
  };
}
