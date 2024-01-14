import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useFontScale() {
  const [fontScale, setFontScale] = useState(
    Dimensions.get('window').fontScale,
  );

  useEffect(() => {
    const listener = Dimensions.addEventListener('change', ({ window }) => {
      setFontScale(window.fontScale);
    });
    return () => listener.remove();
  });

  return fontScale;
}
