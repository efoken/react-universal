import { StyleSheet } from 'react-native-unistyles';

StyleSheet.create((_theme, runtime) => ({
  test: {
    borderColor: 'red',
    paddingLeft: runtime.insets.left,
  },
}));
