import { useUnistyles } from 'react-native-unistyles';

export function useSafeAreaInsets() {
  return useUnistyles().rt.insets;
}
