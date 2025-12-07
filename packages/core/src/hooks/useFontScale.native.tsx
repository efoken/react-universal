import { useEffect, useState } from 'react';
import type { DisplayMetrics } from 'react-native';
import { Dimensions } from 'react-native';

export function useFontScale() {
  const [fontScale, setFontScale] = useState(Dimensions.get('window').fontScale);

  useEffect(() => {
    const listener = Dimensions.addEventListener(
      'change',
      ({ window }: { window: DisplayMetrics }) => {
        setFontScale(window.fontScale);
      },
    );
    return () => listener.remove();
  });

  return fontScale;
}
