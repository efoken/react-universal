import { StyleSheet as RNStyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const StyleSheet: {
  create: typeof createStyleSheet;
  flatten: typeof RNStyleSheet.flatten;
} = {
  create: createStyleSheet,
  flatten: RNStyleSheet.flatten,
};
