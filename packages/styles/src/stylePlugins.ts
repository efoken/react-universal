import { UnistylesPlugin } from 'react-native-unistyles';

export const remPlugin: UnistylesPlugin = {
  name: 'remPlugin',
  onParsedStyle: (_key, styles) => styles,
};

export const fontWeightPlugin: UnistylesPlugin = {
  name: 'fontWeightPlugin',
  onParsedStyle: (_key, acc) => {
    if ('fontWeight' in acc) {
      switch (acc.fontWeight) {
        case 'bold': {
          acc.fontFamily = 'Roboto-Bold';
          break;
        }
        default: {
          acc.fontFamily = 'Roboto-Regular';
          break;
        }
      }
    }
    return acc;
  },
};
