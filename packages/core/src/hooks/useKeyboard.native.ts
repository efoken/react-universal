import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
  const [open, setOpen] = useState(false);

  const handleKeyboardDidShow = useCallback(() => {
    setOpen(true);
  }, []);

  const handleKeyboardDidHide = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ];
    return () => {
      for (const subscription of subscriptions) {
        subscription.remove();
      }
    };
  }, [handleKeyboardDidHide, handleKeyboardDidShow]);

  return { open };
}
