import { StyleSheet } from 'react-native-unistyles';

StyleSheet.create((theme, runtime) => ({
  test: {
    borderColor: 'red',
    paddingLeft: runtime.insets.left,
  },
}));
