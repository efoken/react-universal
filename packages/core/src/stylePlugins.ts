import { isWeb } from '@tamagui/constants';
import { isString } from '@universal-ui/utils';
import type { UnistylesPlugin } from 'react-native-unistyles';
import type { Theme } from './theme';

type StylePlugin = (theme: Theme) => UnistylesPlugin;

export const remPlugin: StylePlugin = () => ({
  name: 'remPlugin',
  onParsedStyle: (_key, acc) => {
    if (isWeb) {
      return acc;
    }
    for (const [key, value] of Object.entries(acc)) {
      if (isString(value) && value.endsWith('rem')) {
        Object.defineProperty(acc, key, Number(value) * 16);
      }
    }
    return acc;
  },
});

export const fontWeightPlugin: StylePlugin = (theme) => ({
  name: 'fontWeightPlugin',
  onParsedStyle: (_key, acc) => {
    if (isWeb) {
      return acc;
    }
    if ('fontWeight' in acc) {
      switch (acc.fontWeight!.toString()) {
        case '700':
        case 'bold': {
          acc.fontFamily = theme.fonts.body.weights[700].normal;
          break;
        }
        default: {
          acc.fontFamily = theme.fonts.body.weights[400].normal;
          break;
        }
      }
    }
    return acc;
  },
});
