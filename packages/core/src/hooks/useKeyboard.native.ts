import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
  const [open, setOpen] = useState(false);

  const handleKeyboardDidShow = () => {
    setOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setOpen(false);
  };

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
  }, []);

  return { open };
}
