import type { UnistylesThemes } from 'react-native-unistyles';
import { defaultTheme } from './theme';

export const StyleRuntime = {
  setTheme: (name: keyof UnistylesThemes) => {},
  updateTheme: (
    name: keyof UnistylesThemes,
    updater: (
      theme: UnistylesThemes[keyof UnistylesThemes],
    ) => UnistylesThemes[keyof UnistylesThemes],
  ) => {},
  breakpoints: defaultTheme.breakpoints,
  insets: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
};
