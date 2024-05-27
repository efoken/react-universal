declare module 'react-native-web' {
  export function unstable_createElement(
    type: React.ElementType,
    props: any,
    options?: { writingDirection?: 'ltr' | 'rtl' },
  ): React.ReactElement;
}
